import Vue from 'vue'
import Electron from 'vue-electron'
import 'normalize.css/normalize.css'
import 'batch-webfont/css/batch-webfont'

Vue.use(Electron)
Vue.config.debug = true

import App from './App'

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount('#app')
