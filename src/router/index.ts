import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../views/fireworks/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/fireworks',
    name: 'fireworks',
    component: () => {
      import(/* webpackChunkName: "fire" */ '../views/fireworks/index.vue');
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
