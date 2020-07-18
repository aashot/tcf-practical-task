import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    user: null
  },
  mutations: {
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    SET_CURRENT_USER(state, payload) {
      state.user = payload;
    },
    REMOVE_CURRENT_USER(state) {
      state.user = null;
    }
  },
  actions: {
  },
  modules: {
    auth
  }
})
