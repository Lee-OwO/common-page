import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../views/fireworks/index.vue';
import baseRouter from './base';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...baseRouter
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
