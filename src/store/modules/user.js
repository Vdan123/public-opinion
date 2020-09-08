import { login, logout, getUserDetails } from '@/api/user';
import { checkStorage, saveToStorage, removeStorage } from '@/utils/localStorage';
import md5 from 'blueimp-md5';
import { Notice } from 'view-design';

const getDefaultState = () => {
  return {
    userInfo: {},
    loginState: checkStorage('loginState'),
    isConnected: false
  };
};

const state = getDefaultState();

const mutations = {
  SET_NAME: (state, userInfo) => {
    state.userInfo = userInfo;
  },

  SOCKET_CONNECT(state, user) {
    state.isConnected = true;
    this._vm.$socket.emit('login', user);
    console.log('建立连接');
  },

  SOCKET_DISCONNECT(state) {
    state.isConnected = false;
    console.log('断开连接');
  }
};

const actions = {
  // user login
  login({ dispatch }, userInfo) {
    const { username, password, verificationCode } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: md5(password), verificationCode }).then(response => {
        resolve(saveToStorage('loginState', response.state));
      }).catch(error => {
        console.log(error, 'error');
        reject(error);
      });
    });
  },
  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeStorage('loginState');
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },

  // 获取用户信息
  getUserDetails({ state, commit }) {
    return new Promise((resolve, reject) => {
      getUserDetails().then(res => {
        commit('SET_NAME', res.data);

        // 获取到登录信息后，建立 websocket
        if (!state.isConnected) {
          const { id } = res.data;
          commit('SOCKET_CONNECT', id);
        }

        resolve();
      }).catch(error => {
        console.log(error, 'error');
        reject(error);
      });
    });
  },

  SOCKET_messageChannel({ state, dispatch }, data) {
    const { content, total } = JSON.parse(data)[0];
    const login = checkStorage('loginState');

    if (!_.isUndefined(login)) {
      dispatch('notice/addCount', total, { root: true });

      Notice.open({
        title: '新消息提醒',
        desc: content
      });
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

