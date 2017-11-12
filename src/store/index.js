import Vue from 'vue'
import Vuex from 'vuex'
import msger from './modules/msger'
import user from './modules/user'
// import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    msger,
    user
  },
  getters
})

export default store
