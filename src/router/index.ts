import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ChatAnalyticsView from '@/views/ChatAnalyticsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/analytics',
            name: 'analytics',
            component: ChatAnalyticsView,
        },
    ],
})

export default router
