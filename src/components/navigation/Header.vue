<template>
    <header class=" bg-linear-[145deg]  from-[#11151b] from-50% to-100% to-sky-950 min-h-[102dvh]">
        <section
            class="px-4 md:px-[10%] flex flex-col md:flex-row md:justify-between md:items-center lg:justify-between lg:items-center items-center justify-center relative min-h-dvh">
            <div v-if="title" class="max-w-[600px] flex flex-col items-center md:items-start lg:items-start">
                <h1
                    class="text-4xl md:text-5xl lg:text-7xl font-bold  bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent inline-block md:text-left lg:text-left text-center  mb-6 md:h-[155px]">
                    {{ title }}
                </h1>
                <p v-if="subTitle"
                    class="text-lg md:text-xl leading-7 md:leading-8 text-neutral-200 mb-10 text-center md:text-left">
                    {{ subTitle }}
                </p>
                <slot v-if="haveButton"></slot>
            </div>
            <div class="hidden md:hidden lg:block">
                <img src="../../assets/screen1.png"
                    class="absolute rounded-3xl lg:w-[275px] shadow-2xl top-[7%] z-30 left-[60%] animate-fall"
                    alt="screen1" />
                <img src="../../assets/screen2.png"
                    class="absolute w-[235px] rounded-3xl top-[3%] rotate-[15deg] z-10 left-[75%] overflow-hidden animate-fall opacity-80"
                    alt="screen2" />
                <img src="../../assets/screen3.png"
                    class="absolute w-[230px] rounded-3xl rotate-[-15deg] top-[25%] z-10 left-[49.3%] animate-fall opacity-70"
                    alt="screen3" />
            </div>
        </section>
    </header>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
    },
    subTitle: {
        type: String,
    },
    haveButton: {
        type: Boolean
    }

})

</script>