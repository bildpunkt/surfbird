const Vue = require('vue');
window.$ = window.jQuery = require('jquery');
window.app = {}

app.tweets = []

Vue.component('stream-item', require('./vue/tweet.vue'))
Vue.component('loader', require('./vue/loader.vue'))

var vm = new Vue({
    el: "#tweets",
    data: {
        tweets: app.tweets,
    },
})


const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('linnun-tweets', function(e, tweet) {
  app.tweets.unshift(tweet)

  if (app.tweets.length >= 0 && !$('#mainloader').hasClass('hidden')) {
    $('#mainloader').addClass('hidden')
  }
});

$('#send').on('click', function () {
    if ($('#tweet').data('tweet-id') !== undefined) {
      tweet = {text: $('#tweet').val(), id: $('#tweet').data('tweet-id')}
    } else {
      tweet = {text: $('#tweet').val()}
    }

    ipcRenderer.send('linnun-send', tweet)
    $('#tweet').val('')
    $('#tweet').removeAttr('data-tweet-id')
});

$(document.body).on('click', 'button.retweet', function() {
    ipcRenderer.send('linnun-retweet', $(this).closest('.tweet').data('tweet-id'))
})

$(document.body).on('click', 'button.favorite', function() {
    ipcRenderer.send('linnun-favorite', $(this).closest('.tweet').data('tweet-id'))
})

$(document.body).on('click', 'button.reply', function() {
    document.getElementById('tweet').setAttribute('data-tweet-id', $(this).closest('.tweet').data('tweet-id'))
    $('#tweet').val("@" + $(this).closest('.tweet').data('username') + " ")
    $('#tweet').focus()
})
