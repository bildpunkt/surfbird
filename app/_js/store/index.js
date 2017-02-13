import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import columns from './modules/columns'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    columns
  },
  strict: debug
})
