const ipcRenderer = require('electron').ipcRenderer
const prepareText = require('../utils/prepare_text')
const toast = require('../utils/toast')

module.exports = function (vm, app) {
  ipcRenderer.on('surfbird:get:tweets', function (e, tweet) {
    tweet.text_html = prepareText(tweet.text)

    if (tweet.retweeted_status !== undefined) {
      tweet.retweeted_status.text_html = prepareText(tweet.retweeted_status.text)
    }

    app.storage.users[tweet.user.id] = tweet.user
    vm.$set('storage.users', app.storage.users)

    app.storage.tweets[tweet.id_str] = tweet
    vm.$set('storage.tweets', app.storage.tweets)
    app.tweets.unshift(tweet.id_str)
  })

  ipcRenderer.on('surfird:hook:success:tweet', function () {
    $('.js-compose-tweet').val('')
    vm.$set('reply', undefined)
    vm.$set('temp.media', [])
    $('.js-remaining-character-count').text(140)
    $('.js-chained-tweets').css('display', 'none')
    $('.js-add-picture-btn').attr('disabled', false)

    toast('Tweet was sent successfully!', 'Success!', 'success')
  })

  ipcRenderer.on('surfird:hook:fail:tweet', function () {
    $('.js-compose-tweet-btn').attr('disabled', false)

    toast('An error occurred while sending your tweet', 'Whoops!', 'error')
  })

  ipcRenderer.on('surfird:hook:success:delete', function (e, data) {
    // delete ID reference
    var index = app.tweets.indexOf(data.id_str)
    if (index > -1) {
      app.tweets.splice(index, 1);
    }

    // delete actual tweet
    delete app.storage.tweets[data.id_str]
    vm.$set('storage.tweets', app.storage.tweets)

    toast('Tweet was deleted successfully!', 'Success!', 'success')
  })

  ipcRenderer.on('surfird:hook:fail:delete', function () {
    toast('An error occurred while deleting your tweet', 'Whoops!', 'error')
  })

  ipcRenderer.on('surfird:hook:nosup:tweet', function () {
    toast("Chained tweets currently don't support media attachments, please shorten your tweet!", 'Whoops!', 'info')
  })
}
