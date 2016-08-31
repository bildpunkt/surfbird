const Vue = require('vue')
var VueI18n = require('vue-i18n')
window.$ = window.jQuery = require('jquery')
const ipcRenderer = require('electron').ipcRenderer
var interactionsurf = false
var twitter = require('twitter-text')
var twemoji = require('twemoji')
require('../../node_modules/lightbox2/dist/js/lightbox.min.js')
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')

window.app = {}
app.user = {}
app.tweets = []
app.tweetStorage = {}
app.interactions = []
app.direct_messages = []
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
Vue.component('direct-message', require('./vue/direct_message.vue'))
Vue.component('loader', require('./vue/loader.vue'))
Vue.component('modal', require('./vue/modal/general.vue'))
Vue.component('settings-modal', require('./vue/modal/settings.vue'))
Vue.component('about-modal', require('./vue/modal/about.vue'))

var vm = new Vue({
  el: '#main',
  data: {
    tweets: app.tweets,
    tweetStorage: app.tweetStorage,
    interactions: app.interactions,
    direct_messages: app.direct_messages,
    sounds: app.sounds,
    themes: app.themes,
    user: app.user,
    reply: undefined
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
  tweet.text_html = twemoji.parse(tweet.text_html,
    function(icon, options, variant) {
      return 'assets/images/emoji/' + icon + '.svg'
    }
  )

  if (tweet.retweeted_status !== undefined) {
    tweet.retweeted_status.text_html = twitter.autoLink(tweet.retweeted_status.text, {'usernameIncludeSymbol': true, 'targetBlank': true})
    tweet.retweeted_status.text_html = twemoji.parse(tweet.retweeted_status.text_html,
      function(icon, options, variant) {
        return 'assets/images/emoji/' + icon + '.svg'
      }
    )
  }

  app.tweetStorage[tweet.id_str] = tweet
  vm.$set('tweetStorage', app.tweetStorage)
  app.tweets.unshift(tweet.id_str)
})

ipcRenderer.on('surfbird:get:interactions', function (e, interaction) {
  if (interaction.event.target_object !== undefined) {
    interaction.event.target_object.text_html = twitter.autoLink(interaction.event.target_object.text, {'usernameIncludeSymbol': true, 'targetBlank': true})
    interaction.event.target_object.text_html = twemoji.parse(interaction.event.target_object.text_html,
      function(icon, options, variant) {
        return 'assets/images/emoji/' + icon + '.svg'
      }
    )
  }

  if (interaction.event.text !== undefined) {
    interaction.event.text_html = twitter.autoLink(interaction.event.text, {'usernameIncludeSymbol': true, 'targetBlank': true})
    interaction.event.text_html = twemoji.parse(interaction.event.text_html,
      function(icon, options, variant) {
        return 'assets/images/emoji/' + icon + '.svg'
      }
    )
  }

  if (interaction.type === 'mention') {
    app.tweetStorage[interaction.event.id_str] = interaction.event
    vm.$set('tweetStorage', app.tweetStorage)
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

ipcRenderer.on('surfbird:get:direct-messages', function (e, message) {
  if (message.direct_message !== undefined) {
    message = message.direct_message
  }

  message.text_html = twitter.autoLink(message.text, {'usernameIncludeSymbol': true, 'targetBlank': true})
  message.text_html = twemoji.parse(message.text_html,
    function(icon, options, variant) {
      return 'assets/images/emoji/' + icon + '.svg'
    }
  )

  if (!(JSON.stringify(app.direct_messages).indexOf(JSON.stringify(message)) > 0)) {
    app.direct_messages.unshift(message)
  }
})

ipcRenderer.on('surfird:hook:success:tweet', function () {
  $('.js-compose-tweet').val('')
  vm.$set('reply', undefined)
  $('.js-remaining-character-count').text(140)
  $('.js-chained-tweets').css('display', 'none')
  $('.js-compose-tweet-btn').attr('disabled', false)
})

ipcRenderer.on('surfird:hook:fail:tweet', function () {
  $('.js-compose-tweet-btn').attr('disabled', false)
})

ipcRenderer.on('surfird:hook:success:direct-message', function () {
  $('.js-compose-recipient').val('')
  $('.js-compose-message').val('')
  $('.js-compose-message-btn').attr('disabled', false)
})

ipcRenderer.on('surfird:hook:fail:direct-message', function () {
  $('.js-compose-message-btn').attr('disabled', false)
})

ipcRenderer.send('surfbird:send:home-timeline', true)
ipcRenderer.send('surfbird:send:mentions-timeline', true)
ipcRenderer.send('surfbird:send:direct-messages', true)
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
    new Notification(n.title, {body: n.body, icon: n.icon, silent: true})
    document.getElementById('notification-tag').play()
  }
}
