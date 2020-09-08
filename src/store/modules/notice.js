import { getWarningInfo } from '@/views/dashboard/api';

const state = {
  warningList: [],
  count: 0
};

const mutations = {
  'SAVE_LIST': (state, payload) => {
    state.warningList = payload;
  },
  'ADD_COUNT': (state, payload) => {
    state.count += payload;
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
  },

  addCount({ commit }, total) {
    commit('ADD_COUNT', total);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
