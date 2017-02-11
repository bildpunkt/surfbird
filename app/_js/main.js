const Vue = require('vue/dist/vue.js')

Vue.component('app', require('./containers/app.vue'))
Vue.component('sidebar', require('./containers/sidebar.vue'))
Vue.component('app-content', require('./containers/content.vue'))
Vue.component('columns', require('./containers/columns.vue'))
Vue.component('drawer', require('./containers/drawer.vue'))

Vue.component('column', require('./components/column/base.vue'))
Vue.component('column-header', require('./components/column/header.vue'))
Vue.component('column-content', require('./components/column/content.vue'))

Vue.component('tweet', require('./components/tweet/base.vue'))
Vue.component('tweet-header', require('./components/tweet/header.vue'))
Vue.component('tweet-footer', require('./components/tweet/footer.vue'))

Vue.component('tweet-media', require('./components/tweet/media/base.vue'))
Vue.component('tweet-media-item', require('./components/tweet/media/item.vue'))

Vue.component('tweet-actions', require('./components/tweet/actions/base.vue'))
Vue.component('tweet-action-reply', require('./components/tweet/actions/reply.vue'))
Vue.component('tweet-action-like', require('./components/tweet/actions/like.vue'))
Vue.component('tweet-action-retweet', require('./components/tweet/actions/retweet.vue'))
Vue.component('tweet-action-more', require('./components/tweet/actions/more.vue'))

Vue.component('composer', require('./components/composer/base.vue'))

var app = new Vue({
  el: '#app'
})
