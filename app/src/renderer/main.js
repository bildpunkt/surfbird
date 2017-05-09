import Vue from 'vue'
import Electron from 'vue-electron'
import Modal from 'vue-js-modal'
import 'normalize.css/normalize.css'
import 'loaders.css/loaders.css'
import 'batch-webfont/css/batch-webfont'

Vue.use(Electron)
Vue.use(Modal)
Vue.config.debug = true

import App from './App'

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount('#app')
