import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'fireworks',
    component: import('@/views/fireworks/index.vue')
  },
  {
    path: '/fire',
    name: 'fire',
    component: () => {
      import(/* webpackChunkName: "fire" */ '@/views/fireworks/index.vue');
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
