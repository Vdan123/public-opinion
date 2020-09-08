import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import _ from 'lodash';

// webSocket
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

const SocketInstance = socketio.connect('http://59.110.223.44:9920');

Vue.use(new VueSocketIO({
  connection: SocketInstance,
  debug: true,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}));

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import '../src/assets/my-theme/index.less';

// Tailwind
import '@/assets/css/main.css';

// Styles: SCSS
import './assets/scss/main.scss';

// fontIcon
import './assets/icon/iconfont.css';

// Permission Control
import './permission';

Vue.use(ViewUI, {
  transfer: true,
  capture: false
});

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  next();
});

router.afterEach(route => {
  ViewUI.LoadingBar.finish();
});

// Global variable
Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
