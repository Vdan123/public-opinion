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
  connection: SocketInstance
}));

// Toast
import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

Vue.use(Toast, {
  position: 'bottom-right',
  toastClassName: 'my-custom-toast',
  timeout: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: false,
  hideProgressBar: true,
  closeButton: false,
  icon: false,
  newestOnTop: false,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter(
      t => t.type === toast.type
    ).length !== 0) {
      // Returning false discards the toast
      return false;
    }
    // You can modify the toast if you want
    return toast;
  }
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
