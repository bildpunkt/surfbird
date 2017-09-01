import Vue from 'vue'
import Electron from 'vue-electron'
import Modal from 'vue-js-modal'
import 'normalize.css/normalize.css'
import 'loaders.css/loaders.css'
import 'batch-webfont/css/batch-webfont'
import App from './App'

Vue.use(Electron)
Vue.use(Modal)
Vue.config.debug = true

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount('#app')
