const twitter = require('../twitter')

module.exports = function (currentUser) {
  return twitter.stream('statuses/filter', {track: '@' + currentUser})
}
