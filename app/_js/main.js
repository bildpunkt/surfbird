const Vue = require('vue');
var VueI18n = require('vue-i18n');
window.$ = window.jQuery = require('jquery');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')

window.app = {}
app.tweets = []
app.interactions = []
app.themes = []

Vue.use(VueI18n)
Vue.config.lang = 'en'

Vue.locale('en', require('./locales/en.json'))

Vue.component('app-header', require('./vue/header.vue'))
Vue.component('compose', require('./vue/compose.vue'))
Vue.component('column', require('./vue/column.vue'))
Vue.component('stream-item', require('./vue/stream-item.vue'))
Vue.component('tweet-body', require('./vue/tweet-body.vue'))
Vue.component('loader', require('./vue/loader.vue'))

var vm = new Vue({
    el: "#main",
    data: {
        tweets: app.tweets,
        interactions: app.interactions,
        themes: app.themes
    },
})


const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('linnun:themes', function(e, theme) {
    app.themes.push(theme);
})

ipcRenderer.on('linnun:tweets', function(e, tweet) {
  app.tweets.unshift(tweet);

  if (app.tweets.length >= 0 && !$('#mainloader').hasClass('hidden')) {
    $('#mainloader').addClass('hidden')
  }
});

ipcRenderer.on('linnun:interactions', function(e, interaction) {
    console.log(interaction);
})

$('#send').on('click', function () {
    if ($('#tweet').data('tweet-id') !== undefined) {
      tweet = {text: $('#tweet').val(), id: $('#tweet').data('tweet-id')}
    } else {
      tweet = {text: $('#tweet').val()}
    }

    ipcRenderer.send('linnun:send', tweet)
    $('#tweet').val('')
    $('#tweet').removeAttr('data-tweet-id')
});

$(document.body).on('click', 'button.retweet', function() {
    if ($(this).hasClass('active')) {
        tweet = {id: $(this).closest('.tweet').data('tweet-id'), type: "unretweet"}
        ipcRenderer.send('linnun:retweet', tweet)
        $(this).removeClass('active')
    } else {
        tweet = {id: $(this).closest('.tweet').data('tweet-id'), type: "retweet"}
        ipcRenderer.send('linnun:retweet', tweet)
        $(this).addClass('active')
    }
})

$(document.body).on('click', 'button.favorite', function() {
    if ($(this).hasClass('active')) {
        tweet = {id: $(this).closest('.tweet').data('tweet-id'), type: "unfavorite"}
        ipcRenderer.send('linnun:favorite', tweet)
        $(this).removeClass('active')
    } else {
        tweet = {id: $(this).closest('.tweet').data('tweet-id'), type: "favorite"}
        ipcRenderer.send('linnun:favorite', tweet)
        $(this).addClass('active')
    }
})

$(document.body).on('click', 'button.reply', function() {
    document.getElementById('tweet').setAttribute('data-tweet-id', $(this).closest('.tweet').data('tweet-id'))
    $('#tweet').val("@" + $(this).closest('.tweet').data('username') + " ")
    $('#tweet').focus()
})

$('#theme-select').change(function(){
    if ($('#theme-select option:selected').val() == '#') {
        $('#theme-tag').attr('href', $('#theme-select option:selected').val())
    } else {
        $('#theme-tag').attr('href', 'assets/themes/' + $('#theme-select option:selected').val())
    }
})

ipcRenderer.send('linnun:home-timeline', true);
