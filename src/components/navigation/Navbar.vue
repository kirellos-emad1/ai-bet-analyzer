<template>
    <nav
        class="fixed w-[80%] z-50 bg-[rgba(18,18,18,0.8)] backdrop-blur-[10px] left-[50%] translate-x-[-50%] shadow-lg ring-1 ring-black/5 p-8 rounded-xl flex items-center justify-between md:h-20 lg:h-20 h-14 lg:mt-4 md:mt-4 mt-2">
        <div class="flex items-center justify-between max-w-7xl">
            <RouterLink to="/" class="z-50">
                <img class="w-16 md:w-20 lg:w-24" src="../../assets/logo.png" alt="ZortLogo">
            </RouterLink>
        </div>

        <div class="hidden md:flex items-center space-x-6 lg:space-x-8">
            <template v-for="link in links" :key="link.name">
                <a v-if="link.path.startsWith('#')" :href="getFullPath(link.path)"
                    @click.prevent="navigateToHash(link.path)" :class="[
                        'text-sm lg:text-base border-b-2 border-transparent transition-all duration-200 pb-1',
                        isActive(link.path) ? 'text-sky-400 border-sky-400' : 'text-neutral-200 hover:text-sky-400 hover:border-sky-400'
                    ]">
                    {{ link.name }}
                </a>
                <RouterLink v-else :to="link.path" active-class="text-sky-400 border-sky-400"
                    class="text-neutral-200 text-sm lg:text-base border-b-2 border-transparent hover:text-sky-400 hover:border-sky-400 transition-all duration-200 pb-1">
                    {{ link.name }}
                </RouterLink>
            </template>
        </div>

        <button @click="isOpen = !isOpen" class="md:hidden text-neutral-200 hover:text-sky-400 transition-colors z-50">

            <v-icon :key="isOpen" :name="!isOpen ? 'hi-solid-menu' : 'io-close'" width="24" height="24"
                class="text-neutral-200  hover:text-sky-400 transition-colors duration-300" />
        </button>

        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 -translate-y-4"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
            <div v-show="isOpen"
                class="md:hidden absolute top-full left-0 right-0 bg-[rgba(18,18,18,0.95)] backdrop-blur-[10px] px-6 py-4 space-y-4">
                <template v-for="link in links" :key="link.name">
                    <a v-if="link.path.startsWith('#')" :href="getFullPath(link.path)"
                        @click.prevent="navigateToHash(link.path); isOpen = false" :class="[
                            'block transition-colors text-base',
                            isActive(link.path) ? 'text-sky-400' : 'text-neutral-200 hover:text-sky-400'
                        ]">
                        {{ link.name }}
                    </a>
                    <RouterLink v-else :to="link.path" @click="isOpen = false" active-class="text-sky-400"
                        class="block text-neutral-200 hover:text-sky-400 transition-colors text-base">
                        {{ link.name }}
                    </RouterLink>
                </template>
            </div>
        </transition>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isOpen = ref(false);

const links = [
    { name: 'Features', path: '#features' },
    { name: 'How It Works', path: '#how-it-works' },
    { name: 'Support', path: '#support' },
    { name: 'Analytics', path: '/analytics' }
];

// Check if we're on the home page
const isHomePage = computed(() => {
    return route.path === '/' || route.path === '';
});

function getFullPath(hash: string) {
    return isHomePage.value ? hash : '/' + hash;
}

function navigateToHash(hash: string) {
    if (!isHomePage.value) {
        router.push('/');
        setTimeout(() => {
            scrollToElement(hash);
        }, 100);
    } else {
        scrollToElement(hash);
    }
}

function scrollToElement(hash: string) {
    const element = document.querySelector(hash);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function isActive(path: string) {
    if (path.startsWith('#')) {
        return window.location.hash === path;
    }
    return route.path === path;
}
</script>
