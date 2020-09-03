import { login, logout, getUserDetails } from '@/api/user';
import { checkStorage, saveToStorage, removeStorage } from '@/utils/localStorage';
import md5 from 'blueimp-md5';

const getDefaultState = () => {
  return {
    userInfo: {},
    loginState: checkStorage('loginState')
  };
};

const state = getDefaultState();

const mutations = {
  SET_NAME: (state, userInfo) => {
    state.userInfo = userInfo;
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
  getUserDetails({ commit }) {
    return new Promise((resolve, reject) => {
      getUserDetails().then(res => {
        commit('SET_NAME', res.data);
        resolve();
      }).catch(error => {
        console.log(error, 'error');
        reject(error);
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

