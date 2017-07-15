import twitterText from 'twitter-text'
import twemoji from 'twemoji'

export function processTweet (tweet) {
  if (tweet.retweeted_status !== undefined) {
    tweet.retweeted_status = processTweet(tweet.retweeted_status)
  }

  if (tweet.quoted_status !== undefined) {
    tweet.quoted_status = processTweet(tweet.quoted_status)
  }

  tweet.text_html = twitterText.autoLink(tweet.text, {'usernameIncludeSymbol': true, 'targetBlank': true})
  tweet.text_html = twemoji.parse(tweet.text_html)

  return tweet
}
