import { getWarningInfo } from '@/views/dashboard/api';

const state = {
  warningList: []
};

const mutations = {
  'SAVE_LIST': (state, payload) => {
    state.warningList = payload;
  }
};
const actions = {
  getWarningInfo({ commit }) {
    return new Promise(resolve => {
      getWarningInfo({}).then(res => {
        if (res.state === 1) {
          commit('SAVE_LIST', res.data);
        }
        resolve();
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
