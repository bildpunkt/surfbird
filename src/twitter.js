const keys = require('./keys')
const tokens = require('./tokens')
const Twit = require('twit')

T = new Twit({
    consumer_key:         keys.get('consumer_key'),
    consumer_secret:      keys.get('consumer_secret'),
    access_token:         tokens.get('access_token'),
    access_token_secret:  tokens.get('access_token_secret')
})

module.exports = T
