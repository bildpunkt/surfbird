var twitter = require('twitter-text')
var twemoji = require('twemoji')

module.exports = function (text) {
  text = twitter.autoLink(text, {'usernameIncludeSymbol': true, 'targetBlank': true})
  text = twemoji.parse(text,
    function (icon, options, variant) {
      return 'assets/images/emoji/' + icon + '.svg'
    })

  return text
}
