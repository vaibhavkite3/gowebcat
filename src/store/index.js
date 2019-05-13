import Vue from 'vue'
import Vuex from 'vuex'
// import Login from './modules/login'
import modules from './modules/modules'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageBlocker: false
  },
  getters,
  mutations,
  actions,
  modules,
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})
