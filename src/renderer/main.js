import Vue from 'vue'
import Electron from 'vue-electron'
import Modal from 'vue-js-modal'
import VueTimeago from 'vue-timeago'
import 'normalize.css/normalize.css'
import 'loaders.css/loaders.css'
import {VueFeatherIconsSsr as icon} from 'vue-feather-icons-ssr'
import App from './App'

Vue.use(Electron)
Vue.use(Modal)
Vue.use(VueTimeago, {
  locale: 'en',
  locales: {
    'en': require('vue-timeago/locales/en-US.json'),
    'de': require('vue-timeago/locales/de-DE.json')
  }
})
Vue.component('icon', icon)

Vue.config.debug = true

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount('#app')
