import { getGroup, getGroupPlan } from '@/views/currentInfo/api';

const state = {
  list: [],
  navbarList: []
};

const mutations = {
  'SAVE_LIST': (state, payload) => {
    state.list = payload;
  },
  'SAVE_NAV': (state, nav) => {
    state.navbarList = nav;
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
  },

  getGroupPlan({ commit }) {
    return new Promise((resolve, reject) => {
      getGroupPlan({}).then(res => {
        if (res.state === 1) {
          commit('SAVE_NAV', res.data);
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
