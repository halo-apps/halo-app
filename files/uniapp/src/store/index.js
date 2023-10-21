import Vue from 'vue'
import Vuex from 'vuex'
import user from './commons/user'
import system from './commons/system'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {user, system}
})

export default store

