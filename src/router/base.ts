import { RouteRecordRaw } from 'vue-router';

import Fireworks from '../views/fireworks/index.vue';
import DesList from '../views/desList/index.vue';

const baseRouter: Array<RouteRecordRaw> = [
  {
    path: '/Fireworks',
    name: 'Fireworks',
    component: Fireworks
  },
  {
    path: '/DesList',
    name: 'DesList',
    component: DesList
  }
];

export default baseRouter;
