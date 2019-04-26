import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import product from './modules/product'
import credit from './modules/credit'
import dictionary from './modules/dictionary'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    product,
    credit,
    dictionary
  },
  getters,
  plugins: [
    // 持久化存储插件
    createPersistedState({
      key: 'vuex',
      storage: localStorage
    })
  ]
})

export default store
