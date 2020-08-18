import { getGroup } from '@/views/currentInfo/api';

const state = {
  list: []
};

const mutations = {
  'SAVE_LIST': (state, payload) => {
    state.list = payload;
  }
};

const actions = {
  getAllGroups({ commit }) {
    return new Promise((resolve, reject) => {
      getGroup({}).then(res => {
        if (res.state === 1) {
          commit('SAVE_LIST', res.data);
        }
        resolve();
      }).catch(error => {
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
