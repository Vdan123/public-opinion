import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import _ from 'lodash';

// webSocket
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

const SocketInstance = socketio.connect('http://192.168.15.155:2120');

Vue.use(new VueSocketIO({
  connection: SocketInstance
}));

// Toast
import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

Vue.use(Toast, {
  position: 'bottom-right',
  timeout: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: false,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: false,
  maxToasts: 20,
  newestOnTop: true
});

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

// Global variable
Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
