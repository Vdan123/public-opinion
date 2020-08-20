import axios from 'axios';
import { Message, Modal } from 'view-design';
import store from '@/store';
import router from '@/router';
import qs from 'qs';

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
});

service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      // 序列化
      config.data = qs.stringify(config.data);
    }

    return config;
  },
  error => {
    console.log(error, '发送的bug');
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.state !== 1 && res.state !== '1') {
      if (res.state === 3) {
        return Modal.info({
          title: '重新登录',
          content: '为了保护您的信息安全，您需要重新登录才可以继续浏览',
          width: 450,
          onOk() {
            store.dispatch('user/logout');
            router.replace('/login');
          }
      })}
      Message.error({
        content: res.message || 'Error',
        duration: 5
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message.error({
      content: error.message,
      duration: 5
    });
    return Promise.reject(error);
  }
);

export default service;
