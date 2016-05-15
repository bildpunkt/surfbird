const Twit = require('twit')

const T = new Twit({
  consumer_key:         'YOUR_KEYS_HERE',
  consumer_secret:      'YOUR_KEYS_HERE',
  access_token:         'YOUR_KEYS_HERE',
  access_token_secret:  'YOUR_KEYS_HERE'
})

module.exports = T