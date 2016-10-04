const Vue = require('vue')
var VueI18n = require('vue-i18n')
window.$ = window.jQuery = require('jquery')
const ipcRenderer = require('electron').ipcRenderer
require('../../node_modules/lightbox2/dist/js/lightbox.min.js')
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')

window.app = {}
app.user = {}
app.tweets = []
app.interactions = []
app.direct_messages = []
app.themes = []
app.sounds = []
app.hidden = []

app.storage = {}
app.storage.tweets = {}
app.storage.users = {}
app.storage.hidden = []

app.mutes = {}
app.mutes.users = []
app.mutes.keywords = []
app.mutes.sources = []

Vue.use(VueI18n)
Vue.config.lang = 'en'

Vue.locale('en', require('./locales/en.json'))

Vue.component('app-header', require('./vue/header.vue'))
Vue.component('compose', require('./vue/compose.vue'))
Vue.component('compose-media', require('./vue/media/compose.vue'))
Vue.component('column', require('./vue/column.vue'))
Vue.component('stream-item', require('./vue/tweet/general.vue'))
Vue.component('hidden-tweet', require('./vue/tweet/hidden.vue'))
Vue.component('tweet-header', require('./vue/tweet/header.vue'))
Vue.component('tweet-body', require('./vue/tweet/body.vue'))
Vue.component('tweet-footer', require('./vue/tweet/footer.vue'))
Vue.component('tweet-media', require('./vue/media/tweet.vue'))
Vue.component('interaction', require('./vue/interaction.vue'))
Vue.component('direct-message', require('./vue/direct_message.vue'))
Vue.component('loader', require('./vue/loader.vue'))
Vue.component('modal', require('./vue/modal/general.vue'))
Vue.component('settings-modal', require('./vue/modal/settings.vue'))
Vue.component('about-modal', require('./vue/modal/about.vue'))
Vue.component('hidden-modal', require('./vue/modal/hidden.vue'))
Vue.component('mutes-modal', require('./vue/modal/mutes.vue'))
Vue.component('media-item', require('./vue/media/item.vue'))

var vm = new Vue({
  el: '#main',
  data: {
    tweets: app.tweets,
    interactions: app.interactions,
    direct_messages: app.direct_messages,
    sounds: app.sounds,
    themes: app.themes,
    user: app.user,
    reply: undefined,
    hidden: app.hidden,
    storage: {
      tweets: app.storage.tweets,
      users: app.storage.users,
      hidden: app.storage.hidden
    },
    temp: {
      media: []
    },
    mutes: {
      users: app.mutes.users,
      keywords: app.mutes.keywords,
      sources: app.mutes.sources
    }
  }
})

require('./data/user.js')(vm, app)
require('./data/themes.js')(app)
require('./data/sounds.js')(app)
require('./data/tweets.js')(vm, app)
require('./data/interactions.js')(vm, app)
require('./data/direct_messages.js')(app)
require('./data/mutes.js')(app)

ipcRenderer.send('surfbird:send:home-timeline', true)
ipcRenderer.send('surfbird:send:mentions-timeline', true)
ipcRenderer.send('surfbird:send:direct-messages', true)
ipcRenderer.send('surfbird:send:themes', true)
ipcRenderer.send('surfbird:send:sounds', true)
ipcRenderer.send('surfbird:send:mutes', true)
ipcRenderer.send('surfbird:send:user', true)
