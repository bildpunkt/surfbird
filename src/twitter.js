const storage = require('./storage')
const Twit = require('twit')

T = new Twit({
    consumer_key:         storage.get('consumer_key'),
    consumer_secret:      storage.get('consumer_secret'),
    access_token:         storage.get('access_token'),
    access_token_secret:  storage.get('access_token_secret')
})

module.exports = T
