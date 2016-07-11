const Vue = require('vue');
var VueI18n = require('vue-i18n');
window.$ = window.jQuery = require('jquery');
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')

window.app = {}
app.user = {}
app.tweets = []
app.interactions = []
app.themes = []

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
    el: "#main",
    data: {
        tweets: app.tweets,
        interactions: app.interactions,
        themes: app.themes,
        user: app.user
    },
})

const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('surfbird:get:user', function(e, user) {
    app.user = user;
    vm.$set('user', user)
})

ipcRenderer.on('surfbird:get:themes', function(e, theme) {
    app.themes.push(theme);
})

ipcRenderer.on('surfbird:get:tweets', function(e, tweet) {
  app.tweets.unshift(tweet);

  if (app.tweets.length >= 0 && !$('#mainloader').hasClass('hidden')) {
    $('#mainloader').addClass('hidden')
  }
});

ipcRenderer.on('surfbird:get:interactions', function(e, interaction) {
    app.interactions.unshift(interaction);

    if (app.interactions.length >= 0 && !$('#interactionloader').hasClass('hidden')) {
        $('#interactionloader').addClass('hidden')
    }
})

$('#send').on('click', function () {
    if ($('#tweet').data('tweet-id') !== undefined) {
      tweet = {text: $('#tweet').val(), id: $('#tweet').data('tweet-id')}
    } else {
      tweet = {text: $('#tweet').val()}
    }

    ipcRenderer.send('surfbird:send:tweet', tweet)
    $('#tweet').val('')
    $('#tweet').removeAttr('data-tweet-id')
});

$(document.body).on('click', 'a.retweet', function(e) {
    e.preventDefault();
    
    if ($(this).hasClass('active')) {
        tweet = {id: $(this).closest('.tweet').data('tweet-id'), type: "unretweet"}
        ipcRenderer.send('surfbird:send:retweet', tweet)
        $(this).removeClass('active')
    } else {
        tweet = {id: $(this).closest('.tweet').data('tweet-id'), type: "retweet"}
        ipcRenderer.send('surfbird:send:retweet', tweet)
        $(this).addClass('active')
    }
})

$(document.body).on('click', 'a.favorite', function(e) {
    e.preventDefault();

    if ($(this).hasClass('active')) {
        tweet = {id: $(this).closest('.tweet').data('tweet-id'), type: "unfavorite"}
        ipcRenderer.send('surfbird:send:favorite', tweet)
        $(this).removeClass('active')
    } else {
        tweet = {id: $(this).closest('.tweet').data('tweet-id'), type: "favorite"}
        ipcRenderer.send('surfbird:send:favorite', tweet)
        $(this).addClass('active')
    }
})

$(document.body).on('click', 'a.reply', function(e) {
    e.preventDefault();

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

ipcRenderer.send('surfbird:send:home-timeline', true);
ipcRenderer.send('surfbird:send:mentions-timeline', true);
ipcRenderer.send('surfbird:send:user', true);
