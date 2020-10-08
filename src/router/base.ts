import { RouteRecordRaw } from 'vue-router';

import Fireworks from '../views/fireworks/index.vue';

const baseRouter: Array<RouteRecordRaw> = [
  {
    path: '/Fireworks',
    name: 'Fireworks',
    component: Fireworks
  }
];

export default baseRouter;
