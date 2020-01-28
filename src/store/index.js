import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingStatus: false
  },
  mutations: {
    setLoadingStatus(state, loading) {
      state.loadingStatus = loading
    }
  }
})

