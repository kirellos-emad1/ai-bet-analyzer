<template>
    <section id="how-it-works"
        class="w-full lg:py-20 md:py-20 pt-80 bg-gradient-to-b flex-col items-center justify-center  from-[#030303] to-[#11151b]">
        <div class="max-w-6xl mx-auto px-14 md:px-8">
            <h2
                class="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                How It Works
            </h2>
            <div class="flex flex-col gap-12 md:gap-16">
                <div class="step-card p-6 md:p-8 rounded-xl bg-sky-900/20 hover:bg-sky-900/30 transition-all">
                    <div class="flex flex-col md:flex-row items-start gap-8">
                        <div class="step-number flex items-center gap-4 md:w-1/4">
                            <div
                                class="w-12 h-12 rounded-full bg-sky-600/30 flex items-center justify-center text-sky-400 font-bold text-xl">
                                1
                            </div>
                            <h3 class="text-xl font-bold text-sky-400 md:hidden">Upload Bet Slip</h3>
                        </div>
                        <div class="md:w-3/4">
                            <h3 class="text-xl font-bold text-sky-400 hidden md:block mb-4">Upload Bet Slip</h3>
                            <p class="text-neutral-300 mb-4">
                                Start by uploading your bet slip screenshot or photo. Our system supports all common
                                formats and sportsbook layouts.
                            </p>
                            <div class="flex items-center gap-2 text-sm text-sky-300">
                                <v-icon name="bi-file-earmark-fill" class="text-sky-400" scale="1"></v-icon>
                                <span>Supports JPG, PNG, PDF</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="step-card p-6 md:p-8 rounded-xl bg-sky-900/20 hover:bg-sky-900/30 transition-all">
                    <div class="flex flex-col md:flex-row items-start gap-8">
                        <div class="step-number flex items-center gap-4 md:w-1/4">
                            <div
                                class="w-12 h-12 rounded-full bg-sky-600/30 flex items-center justify-center text-sky-400 font-bold text-xl">
                                2
                            </div>
                            <h3 class="text-xl font-bold text-sky-400 md:hidden">AI Analysis</h3>
                        </div>
                        <div class="md:w-3/4">
                            <h3 class="text-xl font-bold text-sky-400 hidden md:block mb-4">AI Analysis</h3>
                            <p class="text-neutral-300 mb-4">
                                Our AI processes your bet slip in seconds, identifying teams, odds, and match details
                                while checking 50+ performance factors.
                            </p>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                <div class="flex items-center gap-2 text-sky-300">
                                    <v-icon name="pr-star-fill" scale="1" class="text-sky-400"></v-icon>
                                    <span>Team Stats</span>
                                </div>
                                <div class="flex items-center gap-2 text-sky-300">
                                    <v-icon name="hi-solid-calendar" class="text-sky-400" scale="1"></v-icon>
                                    <span>Match History</span>
                                </div>
                                <div class="flex items-center gap-2 text-sky-300">
                                    <v-icon name="bi-clouds" scale="1" class="text-sky-400"></v-icon>
                                    <span>Weather Data</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-card p-6 md:p-8 rounded-xl bg-sky-900/20 hover:bg-sky-900/30 transition-all">
                    <div class="flex flex-col md:flex-row items-start gap-8">
                        <div class="step-number flex items-center gap-4 md:w-1/4">
                            <div
                                class="w-12 h-12 rounded-full bg-sky-600/30 flex items-center justify-center text-sky-400 font-bold text-xl">
                                3
                            </div>
                            <h3 class="text-xl font-bold text-sky-400 md:hidden">Get Predictions</h3>
                        </div>
                        <div class="md:w-3/4">
                            <h3 class="text-xl font-bold text-sky-400 hidden md:block mb-4">Get Predictions</h3>
                            <p class="text-neutral-300 mb-4">
                                Receive clear win probability percentages with actionable insights to inform your
                                betting decisions.
                            </p>
                            <div class="flex items-center gap-6">
                                <div class="text-center p-4 rounded-lg bg-sky-900/40">
                                    <div class="text-2xl font-bold text-sky-400">72%</div>
                                    <div class="text-sm text-neutral-300">Win Chance</div>
                                </div>
                                <div class="text-center p-4 rounded-lg bg-sky-900/40">
                                    <div class="text-2xl font-bold text-sky-400">1.4x</div>
                                    <div class="text-sm text-neutral-300">Value Ratio</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
.step-card {
    transition: all 0.3s ease;
    transform: translateY(0);
}

.step-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(8, 145, 178, 0.1);
}

.step-number {
    transition: transform 0.3s ease;
}

.step-card:hover .step-number {
    transform: scale(1.05);
}

@media (max-width: 768px) {
    .step-card {
        margin-bottom: 1.5rem;
    }

    .step-number {
        margin-bottom: 1rem;
    }
}
</style>