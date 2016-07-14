const keys = require('./keys')
const twitterAPI = require('node-twitter-api')

const tAuth = new twitterAPI({
    consumerKey: keys.get('consumer_key'),
    consumerSecret: keys.get('consumer_secret'),
    callback: keys.get('callback_url')
})

module.exports = tAuth
