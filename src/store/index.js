import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
