import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import MintUI from 'mint-ui';
// import 'mint-ui/lib/style.css';

import './style/index.less';

createApp(App)
  .use(store)
  .use(router)
  .mount('#page');
