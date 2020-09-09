import { getWarningInfo } from '@/views/dashboard/api';
import { getWarningTotal } from '@/views/notice_lists/api';
import { checkStorage, saveToStorage } from '@/utils/localStorage';

const state = {
  warningList: [],
  count: checkStorage('notice-count')
};

const mutations = {
  'SAVE_LIST': (state, payload) => {
    state.warningList = payload;
  },

  'ADD_COUNT': (state, payload) => {
    state.count += payload;
    saveToStorage('notice-count', state.count);
  },

  'MINUS_COUNT': (state, payload) => {
    state.count -= payload;
    saveToStorage('notice-count', state.count);
  },

  'UPDATE_COUNT': (state, total) => {
    state.count = total;
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
  },

  minus({ commit }, count) {
    commit('MINUS_COUNT', count);
  },

  getNoticeTotal({ commit }) {
    return new Promise(resolve => {
      getWarningTotal({}).then(res => {
        if (res.state === 1) {
          commit('UPDATE_COUNT', res.data.total);
          saveToStorage('notice-count', res.data.total);
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
