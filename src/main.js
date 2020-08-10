import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import _ from 'lodash';

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

// Tailwind
import '@/assets/css/main.css';

// Styles: SCSS
import './assets/scss/main.scss';

Vue.use(ViewUI, {
  transfer: true,
  capture: false
});

// Global variable
Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
