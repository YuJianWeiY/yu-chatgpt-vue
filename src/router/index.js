import { createRouter, createWebHistory } from 'vue-router';
import ChatComponent from '../components/ChatComponent.vue';
import ImgComponent from '../components/ImgComponent.vue';

const routes = [
    {
        path: '/',
        // 默认重定向到 /chat
        redirect: '/chat',
    },
    {
        path: '/chat',
        name: 'Chat',
        component: ChatComponent,
    },
    {
        path: '/img',
        name: 'Img',
        component: ImgComponent,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
