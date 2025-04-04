<script setup lang="ts">
import Header from '@/components/Header.vue';
import { ref } from 'vue';
import axios from 'axios';
import * as d3 from 'd3';

interface Category {
    name: string;
    prompt: string;
}

interface TeamStats {
    goals: number;
    possession: number;
    shotsOnTarget: number;
    winProbability: number;
    [key: string]: number;
}

interface ChartData {
    [team: string]: TeamStats;
}

const betDetails = ref<string>('');
const aiResponse = ref<string>('');
const loading = ref<boolean>(false);
const uploadedImage = ref<string | null>(null);
const chartData = ref<ChartData | null>(null);
const categories = ref<Category[]>([
    {
        name: 'Football',
        prompt: 'Analyze these football teams. Check last 10 matches for each team. Provide: 1. Text analysis, 2. JSON data with team stats (goals: number, possession: number, shotsOnTarget: number, winProbability: number) for D3 charts, 3. Win probability percentage. Format response with "ANALYSIS:" and "DATA:" sections. JSON format: {"Team A": {stats}, "Team B": {stats}}'
    },
]);

const selectedCategory = ref<Category | null>(null);

const handleImageUpload = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            uploadedImage.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
};

// Azure OpenAI configuration
const azureConfig = ref({
    endpoint: import.meta.env.VITE_AZURE_OPENAI_ENDPOINT,
    apiKey: import.meta.env.VITE_AZURE_OPENAI_API_KEY,
    deploymentName: import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT,
    apiVersion: import.meta.env.VITE_AZURE_OPENAI_API_VERSION,
});

interface MessageContent {
    type: string;
    text?: string;
    image_url?: { url: string };
}

interface Message {
    role: string;
    content: string | MessageContent[];
}

const analyzeBet = async (): Promise<void> => {
    if (!betDetails.value && !uploadedImage.value) return;

    loading.value = true;
    try {
        const messages: Message[] = [];

        if (selectedCategory.value) {
            messages.push({
                role: 'system',
                content: selectedCategory.value.prompt
            });
        }

        const userContent: MessageContent[] = [];

        if (betDetails.value) {
            userContent.push({ type: 'text', text: betDetails.value });
        }

        if (uploadedImage.value) {
            userContent.push({
                type: 'image_url',
                image_url: { url: uploadedImage.value }
            });
        }

        messages.push({ role: 'user', content: userContent });

        // Azure-specific API call
        const response = await axios.post(
            `${azureConfig.value.endpoint}/openai/deployments/${azureConfig.value.deploymentName}/chat/completions?api-version=${azureConfig.value.apiVersion}`,
            {
                messages: messages,
                max_tokens: 1000
            },
            {
                headers: {
                    'api-key': azureConfig.value.apiKey,
                    'Content-Type': 'application/json',
                },
            }
        );
        const fullResponse = response.data.choices[0].message.content;

        // Extract analysis and data sections
        const analysisMatch = fullResponse.match(/ANALYSIS:([\s\S]*?)DATA:/);
        const dataMatch = fullResponse.match(/```json\n([\s\S]*?)\n```/);

        aiResponse.value = analysisMatch ? analysisMatch[1].trim() : fullResponse;

        if (dataMatch) {
            try {
                chartData.value = JSON.parse(dataMatch[1]);
                renderChart();
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        }

    } catch (error) {
        console.error(error);
        aiResponse.value = 'Error fetching AI response.';
    }
    loading.value = false;
};

const renderChart = (): void => {
    if (!chartData.value) return;

    const container = d3.select('#chart-container').html('');

    const colors = {
        primary: {
            light: '#38bdf8',
            dark: '#0284c7',
            gradient: ['#38bdf8', '#0284c7']
        },
        secondary: {
            light: '#fb7185',
            dark: '#e11d48',
            gradient: ['#fb7185', '#e11d48']
        },
        background: {
            light: 'rgba(255,255,255,0.08)',
            dark: 'rgba(255,255,255,0.05)'
        }
    };

    const containerNode = container.node() as HTMLElement;
    if (!containerNode) return;

    const containerWidth = containerNode.clientWidth;
    const isMobile = containerWidth < 768;
    const chartMargins = isMobile
        ? { top: 20, right: 20, bottom: 30, left: 40 }
        : { top: 40, right: 40, bottom: 40, left: 50 };
    const fontSizeMultiplier = isMobile ? 0.7 : 1;

    // Add a title for the chart section
    container.append('div')
        .attr('class', 'chart-title')
        .html(`
            <h3 class="text-xl font-semibold mb-4 bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                Match Prediction
            </h3>
        `);

    const wpData = Object.entries(chartData.value).sort((a, b) => b[1].winProbability - a[1].winProbability);
    const totalPercentage = wpData.reduce((sum, [_, data]) => sum + data.winProbability, 0);

    const wpHeight = isMobile ? 90 : 130;

    const wpContainer = container.append('div')
        .attr('class', 'wp-container mb-8')
        .style('width', '100%')
        .style('background', colors.background.light)
        .style('border-radius', '12px')
        .style('backdrop-filter', 'blur(8px)')
        .style('border', '1px solid rgba(255,255,255,0.1)')
        .style('overflow', 'hidden')
        .style('box-shadow', '0 8px 16px rgba(0,0,0,0.1)');

    const wpSvg = wpContainer.append('svg')
        .attr('width', '100%')
        .attr('height', wpHeight);

    wpContainer.insert('div', ':first-child')
        .attr('class', 'wp-title')
        .style('padding', '12px 16px')
        .style('background', 'rgba(0,0,0,0.2)')
        .style('border-bottom', '1px solid rgba(255,255,255,0.05)')
        .html(`
            <span class="text-sm text-sky-300 font-medium">Win Probability</span>
        `);

    let cumulative = 0;
    wpData.forEach(([team, data], i) => {
        const widthPercentage = (data.winProbability / totalPercentage) * 100;

        const gradient = wpSvg.append('defs')
            .append('linearGradient')
            .attr('id', `wp-gradient-${i}`)
            .attr('x1', '0%').attr('y1', '0%')
            .attr('x2', '100%').attr('y2', '100%');

        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', i === 0 ? colors.primary.light : colors.secondary.light);

        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', i === 0 ? colors.primary.dark : colors.secondary.dark);

        wpSvg.append('rect')
            .attr('x', `${cumulative}%`)
            .attr('y', 0)
            .attr('width', `${widthPercentage}%`)
            .attr('height', wpHeight)
            .attr('fill', `url(#wp-gradient-${i})`)
            .attr('rx', i === 0 ? 0 : 0)
            .attr('ry', i === 0 ? 0 : 0);

        wpSvg.append('rect')
            .attr('x', `${cumulative}%`)
            .attr('y', 0)
            .attr('width', `${widthPercentage}%`)
            .attr('height', 8)
            .attr('fill', i === 0 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(251, 113, 133, 0.4)')
            .attr('filter', 'blur(4px)');

        wpSvg.append('text')
            .text(team)
            .attr('x', `${cumulative + widthPercentage / 2}%`)
            .attr('y', wpHeight / 2 - (isMobile ? 8 : 15))
            .attr('text-anchor', 'middle')
            .style('fill', 'white')
            .style('font-size', `${16 * fontSizeMultiplier}px`)
            .style('font-weight', '600')
            .style('text-shadow', '0 2px 4px rgba(0,0,0,0.3)');

        wpSvg.append('text')
            .text(`${data.winProbability}%`)
            .attr('x', `${cumulative + widthPercentage / 2}%`)
            .attr('y', wpHeight / 2 + (isMobile ? 14 : 20))
            .attr('text-anchor', 'middle')
            .style('fill', 'white')
            .style('font-size', `${22 * fontSizeMultiplier}px`)
            .style('font-weight', '700')
            .style('text-shadow', '0 2px 4px rgba(0,0,0,0.3)');
        cumulative += widthPercentage;
    });
};
</script>

<template>
    <Header :have-button="false" title="Smart Bet Analyzer"
        :sub-title="`Leverage GPT-4o to break down your sports bets with instant insights and strategic advice. Just paste your bet slip and let AI do the thinking.`" />
    <section
        class="min-h-dvh px-6 py-20 md:px-[10%] bg-gradient-to-br from-[#11151b] to-[#030303] flex flex-col lg:flex-row items-center justify-center gap-16">
        <!-- Left Panel: Input Controls -->
        <div
            class="w-full max-w-2xl flex flex-col gap-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
            <h2
                class="text-xl md:text-2xl font-semibold  bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                Smart Match Analyzer</h2>

            <!-- Category Selection -->
            <div class="flex flex-col gap-2">
                <label class="text-sky-300 text-sm">Select Category</label>
                <div class="flex flex-wrap gap-3">
                    <button v-for="category in categories" :key="category.name" @click="selectedCategory = category"
                        :class="[
                            'px-4 py-2 rounded-md transition duration-300 font-medium',
                            selectedCategory?.name === category.name
                                ? 'bg-sky-800/90 text-neutral-200 shadow'
                                : 'bg-sky-600 text-neutral-200 hover:bg-sky-700'
                        ]">
                        {{ category.name }}
                    </button>
                </div>
            </div>

            <!-- Textarea Input -->
            <div v-if="selectedCategory" class="flex flex-col gap-2">
                <label class="text-sky-300 text-sm block">Match Details</label>
                <textarea v-model="betDetails" placeholder="Enter team names or match details..."
                    class="w-full rounded-lg bg-sky-950/30 text-neutral-200  placeholder:text-neutral-200   p-4 border border-sky-400 focus:ring-2 focus:ring-sky-400 outline-none resize-none min-h-[120px]"></textarea>
            </div>

            <!-- Upload Image -->
            <div v-if="selectedCategory" class="flex flex-col gap-2">
                <label class="text-sky-300 text-sm ">Upload Bet Slip (Optional)</label>
                <div class="flex items-center gap-3">
                    <input type="file" accept="image/*" @change="handleImageUpload" id="image-upload" class="hidden" />
                    <label for="image-upload"
                        class="cursor-pointer py-2 px-4 bg-sky-600 text-neutral-200 rounded-lg hover:bg-sky-700  transition">
                        Upload Image
                    </label>
                    <span v-if="uploadedImage" class="text-sky-200 font-medium text-sm">Image uploaded</span>
                </div>
            </div>

            <!-- Submit Button -->
            <button @click="analyzeBet" :disabled="loading" v-if="selectedCategory"
                class="w-full py-3 px-6 flex items-center justify-center gap-2 bg-sky-600 text-neutral-200 rounded-lg font-medium hover:bg-sky-700 transition-colors duration-300">
                {{ loading ? 'Analyzing...' : 'Analyze Match' }}
            </button>
        </div>

        <!-- Right Panel: Chart Output -->
        <div id="chart-container"
            class="w-full max-w-xl p-5 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl transition-all duration-500 flex flex-col gap-4 mt-8 lg:mt-0"
            v-show="aiResponse"></div>
    </section>

    <div v-if="aiResponse"
        class=" bg-linear-180 pt-40 from-[#1A1A24] pb-28 from-0% to-100% to-[#000000] w-full px-[10%] ">
        <div id="analysis"
            class="bg-[rgba(255,255,255,0.19)] backdrop-blur-[40px] p-6 w-full h-full flex flex-col items-center justify-center rounded-lg shadow-xl">
            <h2
                class="text-2xl md:text-4xl font-semibold h-auto  bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                Analysis
            </h2>
            <div class="text-white whitespace-pre-wrap py-12">
                <p>{{ aiResponse }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
#chart-container {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

#chart-container svg {
    overflow: visible;
}

.chart-title h3 {
    margin-bottom: 1rem;
}

.wp-container,
.stats-container {
    transition: all 0.3s ease;
}

.wp-container:hover,
.stats-container:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

/* Better axis styling */
:deep(.x-axis text),
:deep(.y-axis text) {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

:deep(.domain),
:deep(.tick line) {
    stroke-width: 0.5px;
}

@media (max-width: 768px) {
    #chart-container {
        padding: 1rem;
        margin-top: 1.5rem;
    }
}
</style>