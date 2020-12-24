import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  getters: {
    isAuth(state){
      return !!state.user
    }
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_USER", user)
    }
  },
  modules: {
  }
})
