const storage = require('./storage')
const twitterAPI = require('node-twitter-api')

const tAuth = new twitterAPI({
    consumerKey: storage.get('consumer_key'),
    consumerSecret: storage.get('consumer_secret'),
    callback: storage.get('callback_url')
})

module.exports = tAuth
