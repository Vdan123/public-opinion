import { login, logout, getUserDetails } from '@/api/user';
import { checkStorage, saveToStorage, removeStorage } from '@/utils/localStorage';

const userInfo = 'userInfo';

const getDefaultState = () => {
  return {
    userInfo: checkStorage(userInfo)
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
      login({ username: username.trim(), password: password, verificationCode }).then(response => {
        if (response.state === 1) {
          dispatch('getUserDetails');
        }
        resolve();
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
        removeStorage(userInfo);
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
        saveToStorage(userInfo, res.data);
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

