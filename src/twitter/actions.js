/*
 * actions.js
 * part of the Surfbird Twitter client
 *
 * Author: Andreas N. <git@pixelde.su>
 * Entrypoint: src/windows/main.js
 *
 * This file provides actions to the Twitter API, which are
 * received from the client frontend over IPC channels
 *
 */

const { ipcMain } = require('electron')
const twitter = require('../twitter')
const twittxt = require('twitter-text')
const fs = require('fs')
const mediaEmitter = new (require('events').EventEmitter)

var postTweetChain = function postTweetChain (tweets, lastId, sender) {
  if (tweets.length == 0) {
    sender.send('surfbird:hook:success:tweet')
    return
  }

  var payload = {status: tweets.shift(), in_reply_to_status_id: lastId}

  twitter.post('statuses/update', payload, function (err, data, response) {
    if (err) {
      e.sender.send('surfbird:hook:fail:tweet')
      return console.error(err)
    }
    postTweetChain(tweets, data.id_str, sender)
  })
}

// Let's wait for sent tweets..
ipcMain.on('surfbird:send:tweet', function (e, tweet) {
  var tweetLength = twittxt.getTweetLength(tweet.text)
  if (tweetLength > 140 && tweet.media.length > 0) {
    e.sender.send('surfbird:hook:nosup:tweet')
  }
  else if (tweetLength > 140) {
    var tweetid = tweet.id
    var tweets = []

    // split the tweet into chunks
    var chunks = tweet.text.split(' ').filter(function (it) {
      return it.length > 0
    })

    // calculate mentions
    var mentionsLength = 0
    var mentions = [] // NOTE: Not using twitter-text function because we only want leading tweets.
    while (chunks.length) {
      var chunk = chunks.shift()
      if (chunk.substr(0, 1) == '@') {
        mentions.push(chunk)
        mentionsLength += chunk.length
      } else {
        chunks.unshift(chunk)
        break
      }
    }
    if (chunks.length == 0) { // only has mentions???
      mentions = chunks
      mentions = []
      mentionsLength = 0
    } else if (mentionsLength > 140) {
      e.sender.send('surfbird:hook:fail:tweet')
      return console.error('Too many mentions!')
    }

    // map urls
    var urls = twittxt.extractUrls(tweet.text, {extractUrlsWithoutProtocol: false}).map(function (it) {
      return it.toLowerCase()
    })

    while (chunks.length > 0) {
      var tweet = [].concat(mentions)
      var textLength = 0
      while (tweet.length + textLength + mentionsLength - 1 < 140 && chunks.length > 0) {
        var chunk = chunks.shift()
        var length = chunk.length
        // check if it's a url
        if (urls.indexOf(chunk.toLowerCase()) > -1) {
          length = chunk.match(twittxt.regexen.urlHasHttps) ? 23 : 23 // TODO: Use configuration.
        }
        // chunk if overflow
        if (tweet.length + textLength + mentionsLength + length > 140) {
          // word is too long, split it up.
          if (textLength == 0) {
            if (urls.indexOf(chunk.toLowerCase()) > -1) {
              e.sender.send('surfbird:hook:fail:tweet')
              return console.error('Error! Can\'t segment URL!')
            } else {
              length = 140 - (tweet.length + textLength + 1 + mentionsLength)
              chunks.unshift(chunk.substr(length))
              tweet.push(chunk.substr(0, length))
              textLength += length
              break
            }
          } else { // push it to the next tweet
            chunks.unshift(chunk)
            break
          }
        }
        tweet.push(chunk)
        textLength += length
      }
      tweets.push(tweet.join(' '))
    }

    return postTweetChain(tweets, tweetid, e.sender)
  } else {
    var mediaIDs = []
    var params = {}

    var i = 1

    if (tweet.media.length > 0) {
      tweet.media.forEach(function (media) {
        var b64content = fs.readFileSync(media, { encoding: 'base64' })

        twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
          // now we can assign alt text to the media, for use by screen readers and
          // other text-based presentations and interpreters
          mediaIDs.push(data.media_id_string)

          var meta_params = { media_id: data.media_id_string, alt_text: { text: tweet.text } }

          twitter.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
              // now we can reference the media and post a tweet (media will attach to the tweet)
              if (tweet.id !== undefined) {
                params = { status: tweet.text, media_ids: mediaIDs, in_reply_to_status_id: tweet.id }
              } else {
                params = { status: tweet.text, media_ids: mediaIDs }
              }

              if (i == tweet.media.length) {
                mediaEmitter.emit('tweet')
              } else {
                i++
              }
            }
          })
        })
      })
      mediaEmitter.once('tweet', function () {
        twitter.post('statuses/update', params, function (err, data, response) {
          if (err) {
            e.sender.send('surfbird:hook:fail:tweet')
            return console.log(i + ':' + err)
          }
          e.sender.send('surfbird:hook:success:tweet')
          params = {}
          mediaIDs = []
          i = 1
        })
      })
    } else if (tweet.id !== undefined) {
      // ..with an ID attached (as reply)
      twitter.post('statuses/update', { status: tweet.text, in_reply_to_status_id: tweet.id }, function (err, data, response) {
        if (err) {
          e.sender.send('surfbird:hook:fail:tweet')
          return console.log(err)
        }
        e.sender.send('surfbird:hook:success:tweet')
      })
    } else {
      // ..with no ID attached (as puretweet)
      twitter.post('statuses/update', { status: tweet.text }, function (err, data, response) {
        if (err) {
          e.sender.send('surfbird:hook:fail:tweet')
          return console.log(err)
        }
        e.sender.send('surfbird:hook:success:tweet')
      })
    }
  }
})

// Let's wait for retweets..
ipcMain.on('surfbird:send:retweet', function (e, tweet) {
  // ..and then post them to Twitter
  if (tweet.type === 'retweet') {
    twitter.post('statuses/retweet/:id', { id: tweet.id }, function (err, data, response) {
      if (err) return console.log(err)
    })
  } else if (tweet.type === 'unretweet') {
    twitter.post('statuses/unretweet/:id', { id: tweet.id }, function (err, data, response) {
      if (err) return console.log(err)
    })
  }
})

// Let's wait for favorites..
ipcMain.on('surfbird:send:favorite', function (e, tweet) {
  // ..and then post them to Twitter
  if (tweet.type === 'favorite') {
    twitter.post('favorites/create', { id: tweet.id }, function (err, data, response) {
      if (err) return console.log(err)
    })
  } else if (tweet.type === 'unfavorite') {
    twitter.post('favorites/destroy', { id: tweet.id }, function (err, data, response) {
      if (err) return console.log(err)
    })
  }
})

ipcMain.on('surfbird:send:direct-message', function (e, message) {
  twitter.post('direct_messages/new', {screen_name: message.recipient, text: message.text}, function (err, data, response) {
    if (err) {
      e.sender.send('surfbird:hook:fail:direct-message')
      return console.log(err)
    }
    e.sender.send('surfbird:hook:success:direct-message')
  })
})

ipcMain.on('surfbird:send:delete', function (e, id) {
  twitter.post('statuses/destroy', {id: id}, function (err, data, response) {
    if (err) {
      e.sender.send('surfbird:hook:fail:delete')
      return console.log(err)
    }
    e.sender.send('surfbird:hook:success:delete', data)
  })
})
