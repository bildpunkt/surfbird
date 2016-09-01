const ipcRenderer = require('electron').ipcRenderer
const prepareText = require('../utils/prepare_text')

module.exports = function (vm, app) {
    ipcRenderer.on('surfbird:get:tweets', function (e, tweet) {
    tweet.text_html = prepareText(tweet.text)

    if (tweet.retweeted_status !== undefined) {
        tweet.retweeted_status.text_html = prepareText(tweet.retweeted_status.text)
    }

    app.tweetStorage[tweet.id_str] = tweet
    vm.$set('tweetStorage', app.tweetStorage)
    app.tweets.unshift(tweet.id_str)
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
}
