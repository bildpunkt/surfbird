const Vue = require('vue/dist/vue.js')

Vue.component('hello-world', require('./components/hello-world.vue'))

var app = new Vue({
  el: '#app'
})
