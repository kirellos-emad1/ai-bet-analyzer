<template>
    <section id="features"
        class="w-full py-20 bg-gradient-to-b h-dvh flex items-center justify-center from-[#11151b] to-[#030303]">
        <div class="max-w-6xl mx-auto px-14 md:px-8">
            <h2
                class="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                Key Features
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                <div class="feature-card p-6 rounded-xl bg-sky-900/20 hover:bg-sky-900/30 transition-all">
                    <div class="icon-container mb-6">
                        <div class="w-16 h-16 rounded-full bg-sky-600/30 flex items-center justify-center">
                            <v-icon name="hi-camera" class=" text-sky-400" scale="2"></v-icon>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-sky-400 mb-4">Instant Bet Slip Scan</h3>
                    <p class="text-neutral-300 mb-4">
                        Scan or upload bet slips for instant AI analysis. Supports all major sportsbooks and formats.
                    </p>
                    <ul class="text-sm text-sky-300 space-y-2">
                        <li class="flex items-center">
                            <v-icon name="hi-check" class=" text-sky-500 mr-1" scale="1"></v-icon>
                            Automatic sport detection
                        </li>
                        <li class="flex items-center">
                            <v-icon name="hi-check" class=" text-sky-500 mr-1" scale="1"></v-icon>
                            Team/player recognition
                        </li>
                    </ul>
                </div>
                <div class="feature-card p-6 rounded-xl bg-sky-900/20 hover:bg-sky-900/30 transition-all">
                    <div class="icon-container mb-6">
                        <div class="w-16 h-16 rounded-full bg-sky-600/30 flex items-center justify-center">
                            <v-icon name="hi-solid-trending-up" class=" text-sky-400" scale="2"></v-icon>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-sky-400 mb-4">Smart Match Analysis</h3>
                    <p class="text-neutral-300 mb-4">
                        Detailed breakdown of team performance, historical data, and real-time statistics.
                    </p>
                    <ul class="text-sm text-sky-300 space-y-2">
                        <li class="flex items-center">
                            <v-icon name="hi-check" class=" text-sky-500 mr-1" scale="1"></v-icon>

                            50+ performance metrics
                        </li>
                        <li class="flex items-center">
                            <v-icon name="hi-check" class=" text-sky-500 mr-1" scale="1"></v-icon>
                            Injury & weather tracking
                        </li>
                    </ul>
                </div>
                <div class="feature-card p-6 rounded-xl bg-sky-900/20 hover:bg-sky-900/30 transition-all">
                    <div class="icon-container mb-6">
                        <div class="w-16 h-16 rounded-full bg-sky-600/30 flex items-center justify-center">
                            <div class="w-16 h-16 rounded-full bg-sky-600/30 flex items-center justify-center">
                                <v-icon name="bi-bar-chart" class=" text-sky-400" scale="2"></v-icon>
                            </div>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-sky-400 mb-4">Win Probability</h3>
                    <p class="text-neutral-300 mb-4">
                        AI-powered win predictions with dynamic percentage updates based on live game data.
                    </p>
                    <ul class="text-sm text-sky-300 space-y-2">
                        <li class="flex items-center">
                            <v-icon name="hi-check" class=" text-sky-500 mr-1" scale="1"></v-icon>
                            Real-time updates
                        </li>
                        <li class="flex items-center">
                            <v-icon name="hi-check" class=" text-sky-500 mr-1" scale="1"></v-icon>
                            Historical accuracy tracking
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.feature-card {
    transition: all 0.3s ease;
    transform: translateY(0);
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(8, 145, 178, 0.1);
}

.icon-container {
    transition: transform 0.3s ease;
}

.feature-card:hover .icon-container {
    transform: scale(1.05);
}

@media (max-width: 768px) {
    .feature-card {
        margin-bottom: 2rem;
    }
}
</style>