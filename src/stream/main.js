const twitter = require('../twitter')
const stream = twitter.stream('user', {with: 'followings', include_rts: 'false'})

module.exports = stream
