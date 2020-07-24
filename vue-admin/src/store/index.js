import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
import login from './modules/login'
import app from './modules/app'
import info from './modules/info'
export default new Vuex.Store({
  state: { },
  mutations: { },
  actions: { },
  modules: {
    app,
    login,
    info
  }
})
