const keys = require('./storage/keys')
const TwitterAPI = require('node-twitter-api')

const tAuth = new TwitterAPI({
  consumerKey: keys.get('consumer_key'),
  consumerSecret: keys.get('consumer_secret'),
  callback: keys.get('callback_url')
})

module.exports = tAuth
