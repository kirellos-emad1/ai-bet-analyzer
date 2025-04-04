<template>
    <Header :title="'Transform Your Betting Game'" :sub-title="`Harness the power of AI to track, analyze, and optimize your
                    sports betting. Instant bet slip scanning, real-time analytics, and intelligent insights at your
                    fingertips.`" :have-button="true">
        <RouterLink to="/analytics">
            <button
                class="py-3 px-4 bg-sky-600 text-white min-w-[150px] md:min-w-[200px] lg:w-[200px] font-medium rounded-lg hover:bg-sky-700  transition-colors duration-300">
                Go to Demo
            </button>
        </RouterLink>
    </Header>
    <!--  -->
    <RealTimeSection :real-time-section="realTimeSection" />
    <!-- -->
    <Features />
    <!-- -->
    <HowItWorks />
    <!-- -->
    <Support />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import RealTimeSection from '@/components/RealTimeSection.vue';
import Header from '@/components/Header.vue';
import Features from '@/components/Features.vue';
import HowItWorks from '@/components/HowItWorks.vue';
import Support from '@/components/Support.vue';

interface Section {
    id: string;
    leftHeader: string;
    leftText: string;
    rightHeader: string;
    rightText: string;
    img: string;
    buttonText: string;
}
const realTimeSection = reactive<Section[]>([
    {
        id: 'features',
        leftHeader: 'Smart Bet Tracking',
        leftText: 'Never lose track of a bet again. Our intelligent system automatically categorizes and monitors all your active bets across multiple sportsbooks.',
        rightHeader: 'Real-Time Updates',
        rightText: 'Get instant notifications about score changes, game developments, and potential cash-out opportunities directly on your device.',
        img: 'src/assets/screen1.png',
        buttonText: 'Explore Features'
    },
    {
        id: 'how-it-works',
        leftHeader: 'Advanced Analytics',
        leftText: 'Discover your betting strengths and weaknesses with comprehensive analytics that break down performance by sport, bet type, and odds range.',
        rightHeader: 'AI-Powered Insights',
        rightText: 'Our machine learning algorithms analyze your betting history to identify patterns and opportunities that can significantly improve your success rate.',
        img: 'src/assets/screen2.png',
        buttonText: 'See How It Works'
    },
    {
        id: 'support',
        leftHeader: 'Strategy Optimization',
        leftText: 'Leverage data-driven recommendations to refine your betting strategy and maximize ROI with personalized insights tailored to your betting style.',
        rightHeader: 'Performance Dashboard',
        rightText: 'Track key metrics like win rate, average odds, yield percentage, and bankroll growth with intuitive visualizations and detailed breakdowns.',
        img: 'src/assets/screen3.png',
        buttonText: 'Get Support'
    },
]);
</script>

<style>
html {
    scroll-behavior: smooth;
}

@keyframes fall {
    from {
        transform: translateY(-150px);
    }

    to {
        transform: translateY(0);
    }
}

.animate-fall {
    animation: fall 0.8s ease-out forwards;
}
</style>