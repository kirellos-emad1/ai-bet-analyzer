<template>
    <section
        class="relative w-full min-h-auto h-auto flex flex-col pt-20 md:pt-60 z-10 items-center bg-linear-[165deg]  from-[#11151b] from-0% to-100% to-[#030303]">
        <h2
            class="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
            Real-Time Analytics Dashboards
        </h2>

        <div class="relative w-full h-[750dvh] max-w-5xl flex flex-col items-center">
            <div class="sticky-triggers flex flex-col justify-start absolute inset-0">
                <div v-for="section in realTimeSection" :key="section.id" class="sticky-trigger h-[200vh]"></div>
            </div>
            <div
                class="flex flex-col md:flex-row justify-between items-center w-full h-auto min-h-[100dvh] py-0 sticky top-0 px-4 md:px-8">
                <div
                    class="w-full md:w-1/3 order-1 md:order-1 flex justify-center md:justify-end md:pr-6  mt-17 md:mb-0">
                    <div v-for="(section, index) in realTimeSection" :key="`left-${section.id}`"
                        class="left-text max-w-xs text-left opacity-0 flex-col gap-2 hidden">
                        <h3
                            class="text-xl md:text-2xl font-bold text-sky-600 lg:mb-2 md:mb-2 mb-0 text-center md:text-left">
                            {{
                                section.leftHeader }}</h3>
                        <p class="text-base md:text-lg text-neutral-200 mb-2 text-center  text-pretty md:text-left">{{
                            section.leftText }}</p>
                        <div class="flex justify-center md:justify-start">
                            <a :href="`#${section.id}`" class="w-fit">
                                <button
                                    class="py-2 px-4 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-300">
                                    {{ section.buttonText }}
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col justify-center items-center relative order-2 md:order-2 mb-6 md:mb-0">
                    <img src="https://cdn.prod.website-files.com/64da07a5bc219a0c49e31e1c/64dc9c9f83affa6fdcc2a109_iPhone-13-p-500.png"
                        alt="iPhone" class="max-w-[300px] md:max-w-[370px] relative w-64 md:w-80 z-10 inline-block" />
                    <img v-for="(section, index) in realTimeSection" :key="`screen-${section.id}`" :src="section.img"
                        class="screen opacity-0 w-[230px] md:w-[290px] absolute z-[11]" :alt="`screen-${index}`"
                        loading="lazy" />
                </div>
                <div class="w-full md:w-1/3 order-3 md:order-3 flex justify-center md:justify-start md:pl-6">
                    <div v-for="(section, index) in realTimeSection" :key="`right-${section.id}`"
                        class="right-text max-w-xs text-left opacity-0 hidden">
                        <h3 class="text-xl md:text-2xl font-bold text-sky-600 mb-2 text-center md:text-left">{{
                            section.rightHeader }}</h3>
                        <p class="text-base md:text-lg text-neutral-200 text-center md:text-left">{{ section.rightText
                        }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, type PropType } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface RealTimeSectionType {
    id: string;
    leftHeader: string;
    leftText: string;
    rightHeader: string;
    rightText: string;
    img: string;
    buttonText: string;
}
const props = defineProps({
    realTimeSection: {
        type: Array as PropType<RealTimeSectionType[]>,
        required: true
    }
});

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);

    const screens = gsap.utils.toArray<HTMLElement>('.screen');
    const stickyTriggers = gsap.utils.toArray<HTMLElement>('.sticky-trigger');
    const leftTexts = gsap.utils.toArray<HTMLElement>('.left-text');
    const rightTexts = gsap.utils.toArray<HTMLElement>('.right-text');

    gsap.set(screens, { opacity: 0 });
    gsap.set(leftTexts, { opacity: 0, display: 'none' });
    gsap.set(rightTexts, { opacity: 0, display: 'none' });

    gsap.set(screens[0], { opacity: 1 });
    gsap.set(leftTexts[0], { opacity: 1, display: 'flex' });
    gsap.set(rightTexts[0], { opacity: 1, display: 'block' });

    stickyTriggers.forEach((trigger, index) => {
        if (index > 0) {
            ScrollTrigger.create({
                trigger: trigger,
                start: "top center",
                onEnter: () => {
                    gsap.to(screens[index - 1], { opacity: 0, duration: 0.5 });
                    gsap.to(leftTexts[index - 1], {
                        opacity: 0, duration: 0.5, onComplete: () => {
                            gsap.set(leftTexts[index - 1], { display: 'none' });
                            gsap.set(leftTexts[index], { display: 'flex' });
                            gsap.to(leftTexts[index], { opacity: 1, duration: 0.5 });
                        }
                    });
                    gsap.to(rightTexts[index - 1], {
                        opacity: 0, duration: 0.5, onComplete: () => {
                            gsap.set(rightTexts[index - 1], { display: 'none' });
                            gsap.set(rightTexts[index], { display: 'block' });
                            gsap.to(rightTexts[index], { opacity: 1, duration: 0.5 });
                        }
                    });
                    gsap.to(screens[index], { opacity: 1, duration: 0.5 });
                },
                onLeaveBack: () => {
                    gsap.to(screens[index], { opacity: 0, duration: 0.5 });
                    gsap.to(leftTexts[index], {
                        opacity: 0, duration: 0.5, onComplete: () => {
                            gsap.set(leftTexts[index], { display: 'none' });
                            gsap.set(leftTexts[index - 1], { display: 'flex' });
                            gsap.to(leftTexts[index - 1], { opacity: 1, duration: 0.5 });
                        }
                    });
                    gsap.to(rightTexts[index], {
                        opacity: 0, duration: 0.5, onComplete: () => {
                            gsap.set(rightTexts[index], { display: 'none' });
                            gsap.set(rightTexts[index - 1], { display: 'block' });
                            gsap.to(rightTexts[index - 1], { opacity: 1, duration: 0.5 });
                        }
                    });
                    gsap.to(screens[index - 1], { opacity: 1, duration: 0.5 });
                }
            });
        }
    });
});
</script>

<style scoped>
.sticky-triggers {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: absolute;
    inset: 0%;
}

.screen {
    -webkit-mask-image: url('https://cdn.prod.website-files.com/64da07a5bc219a0c49e31e1c/64dc9c9f83affa6fdcc2a109_iPhone-13-p-500.png');
    mask-image: url('https://cdn.prod.website-files.com/64da07a5bc219a0c49e31e1c/64dc9c9f83affa6fdcc2a109_iPhone-13-p-500.png');
    mask-size: cover;
    mask-position: center;
}

/* Mobile-first styles */
@media (max-width: 768px) {

    .left-text,
    .right-text {
        margin-bottom: 1.5rem;
        width: 100%;
        padding: 0 1rem;
    }
}
</style>