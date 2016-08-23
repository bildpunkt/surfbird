const Vue = require('vue')
var VueI18n = require('vue-i18n')
window.$ = window.jQuery = require('jquery')
const ipcRenderer = require('electron').ipcRenderer
var interactionsurf = false
var twitter = require('twitter-text')
require('../../node_modules/lightbox2/dist/js/lightbox.min.js')
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')

window.app = {}
app.user = {}
app.tweets = []
app.interactions = []
app.themes = []
app.sounds = []

Vue.use(VueI18n)
Vue.config.lang = 'en'

Vue.locale('en', require('./locales/en.json'))

Vue.component('app-header', require('./vue/header.vue'))
Vue.component('compose', require('./vue/compose.vue'))
Vue.component('column', require('./vue/column.vue'))
Vue.component('stream-item', require('./vue/tweet/general.vue'))
Vue.component('tweet-body', require('./vue/tweet/body.vue'))
Vue.component('tweet-footer', require('./vue/tweet/footer.vue'))
Vue.component('interaction', require('./vue/interaction.vue'))
Vue.component('loader', require('./vue/loader.vue'))
Vue.component('modal', require('./vue/modal/general.vue'))
Vue.component('settings-modal', require('./vue/modal/settings.vue'))

var vm = new Vue({
  el: '#main',
  data: {
    tweets: app.tweets,
    interactions: app.interactions,
    sounds: app.sounds,
    themes: app.themes,
    user: app.user
  }
})

ipcRenderer.on('surfbird:get:user', function (e, user) {
  app.user = user
  vm.$set('user', user)
})

ipcRenderer.on('surfbird:get:themes', function (e, theme) {
    // the probably most stylish way to check if an array of objects contains a specific object
    // joking, I actually hate this approach, thank you JS
  if (!(JSON.stringify(app.themes).indexOf(JSON.stringify(theme)) > 0)) {
    app.themes.push(theme)
  }
})

ipcRenderer.on('surfbird:get:sounds', function (e, sound) {
  if (!(JSON.stringify(app.sounds).indexOf(JSON.stringify(sound)) > 0)) {
    app.sounds.push(sound)
  }
})

ipcRenderer.on('surfbird:get:tweets', function (e, tweet) {
  tweet.text_html = twitter.autoLink(tweet.text, {'usernameIncludeSymbol': true, 'targetBlank': true})

  if (tweet.retweeted_status !== undefined) {
    tweet.retweeted_status.text_html = twitter.autoLink(tweet.retweeted_status.text, {'usernameIncludeSymbol': true, 'targetBlank': true})
  }
  app.tweets.unshift(tweet)
})

ipcRenderer.on('surfbird:get:interactions', function (e, interaction) {
  if (interaction.event.target_object !== undefined) {
    interaction.event.target_object.text_html = twitter.autoLink(interaction.event.target_object.text, {'usernameIncludeSymbol': true, 'targetBlank': true})
  }

  if (interaction.event.text !== undefined) {
    interaction.event.text_html = twitter.autoLink(interaction.event.text, {'usernameIncludeSymbol': true, 'targetBlank': true})
  }

  app.interactions.unshift(interaction)

  if (interactionsurf) {
    SurfNotification(interaction, interaction.event)
  }

    // skip the first 20 notifications, because we are pulling in 20 mentions from the beginning
  if (app.interactions.length > 19) {
    interactionsurf = true
  }
})

$('#send').on('click', function () {
  var tweet = {}

  if ($('#tweet').data('tweet-id') !== undefined) {
    tweet = {text: $('#tweet').val(), id: $('#tweet').data('tweet-id')}
  } else {
    tweet = {text: $('#tweet').val()}
  }

  ipcRenderer.send('surfbird:send:tweet', tweet)
  $('#tweet').val('')
  $('#tweet').removeAttr('data-tweet-id')
})

$(document.body).on('click', '#logout', function (e) {
  ipcRenderer.send('surfbird:logout', true)
})

ipcRenderer.send('surfbird:send:home-timeline', true)
ipcRenderer.send('surfbird:send:mentions-timeline', true)
ipcRenderer.send('surfbird:send:themes', true)
ipcRenderer.send('surfbird:send:sounds', true)
ipcRenderer.send('surfbird:send:user', true)

var SurfNotification = function (event, content) {
  var n = {}

  switch (event.type) {
    case 'mention':
      n = {title: `@${content.user.screen_name} mentioned you`,
                 body: content.text,
                 icon: content.user.profile_image_url}
      break
    case 'retweet':
      n = {title: `@${content.source.screen_name} retweeted your tweet`,
                 body: content.target_object.text,
                 icon: content.source.profile_image_url}
      break
    case 'favorite':
      n = {title: `@${content.source.screen_name} liked your tweet`,
                 body: content.target_object.text,
                 icon: content.source.profile_image_url}
      break
    case 'follow':
      n = {title: `@${content.source.screen_name} followed you`,
                 body: content.source.description,
                 icon: content.source.profile_image_url}
      break
  }

  if (n.title !== undefined) {
    Notification(n.title, {body: n.body, icon: n.icon, silent: true})
    document.getElementById('notification-tag').play()
  }
}
