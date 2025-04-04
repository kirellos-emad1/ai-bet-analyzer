<template>
    <footer class="bg-[#0c121b] ">
        <div class="max-w-6xl mx-auto px-4 md:px-8 py-8">
            <div class="flex flex-col md:flex-row md:justify-between items-center gap-6 text-center">
                <div class="space-y-2">
                    <h3
                        class="text-xl font-bold bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                        Zort
                    </h3>
                    <p class="text-sm text-neutral-400">
                        Smarter Sports Betting Through AI
                    </p>
                </div>

                <div class="flex flex-wrap justify-center gap-6 md:gap-8">
                    <a href="/#features" class="text-neutral-300 hover:text-sky-400 text-sm transition-colors">
                        Features
                    </a>
                    <a href="/#how-it-works" class="text-neutral-300 hover:text-sky-400 text-sm transition-colors">
                        How It Works
                    </a>
                    <a href="/#support" class="text-neutral-300 hover:text-sky-400 text-sm transition-colors">
                        Support
                    </a>

                    <RouterLink to="analytics" class="text-neutral-300 hover:text-sky-400 text-sm transition-colors">
                        Analytics
                    </RouterLink>
                </div>

                <div class="text-neutral-400 text-sm order-last md:order-none">
                    <p>&copy; {{ new Date().getFullYear() }} Zort. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">

import { RouterLink } from 'vue-router';
</script>

<style>
/* Smooth scroll behavior */
html {
    scroll-behavior: smooth;
}

@media (max-width: 768px) {
    footer div.flex {
        flex-direction: column;
        gap: 1.5rem;
    }

    .flex-wrap {
        gap: 1rem;
    }
}
</style>