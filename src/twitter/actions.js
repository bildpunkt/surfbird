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

var postTweetChain = function postTweetChain (tweets, lastId, sender) {
  if (tweets.length == 0) {
    sender.send('surfird:hook:success:tweet');
    return;
  }
  var payload = {status: tweets.shift()};
  if (lastId !== void 8) {
    payload.in_reply_to_status_id = lastId;
  }

  twitter.post('statuses/update', payload, function (err, data, response) {
    if (err) {
      return console.error(err);
    }
    postTweetChain(tweets, data.id_str, sender);
  });
}

// Let's wait for sent tweets..
ipcMain.on('surfbird:send:tweet', function (e, tweet) {
  var tweetLength = twittxt.getTweetLength(tweet.text);
  if (tweetLength > 140) {
    var tweets = [];

    // split the tweet into chunks
    var chunks  = tweet.text.split(' ').filter(function (it) {
      return it.length > 0;
    });

    // calculate mentions
    var mentionsLength = 0;
    var mentions       = []; // NOTE: Not using twitter-text function because we only want leading tweets.
    while (chunks.length) {
      var chunk = chunks.shift()
      if (chunk.substr(0, 1) == '@') {
        mentions.push(chunk)
        mentionsLength += chunk.length;
      } else {
        chunks.unshift(chunk);
        break;
      }
    }
    mentionsLength += mentions.length - 1;
    if (chunks.length == 0) { // only has mentions???
      mentions       = chunks;
      mentions       = [];
      mentionsLength = 0;
    } else if (mentionsLength > 140) {
      return console.error('Too many mentions!');
    }

    // map urls
    var urls = twittxt.extractUrls(tweet.text, {extractUrlsWithoutProtocol: false}).map(function (it) {
      return it.toLowerCase();
    });

    // strip empty spaces
    tweetLength = chunks.length - 1;
    chunks.forEach(function (it) {
      tweetLength += it.length;
    });

    while (chunks.length > 0) {
      var tweet      = [].concat(mentions);
      var textLength = 0;
      while (tweet.length + textLength + mentionsLength - 1 < 140 && chunks.length > 0) {
        var chunk  = chunks.shift();
        var length = chunk.length;
        // check if it's a url
        if (urls.indexOf(chunk.toLowerCase()) > -1) {
          length = chunk.match(twittxt.regexen.urlHasHttps) ? 23 : 23; // TODO: Use configuration.
        }
        // chunk if overflow
        if (tweet.length + textLength + mentionsLength + length > 140) {
          // word is too long, split it up.
          if (tweetLength == 0) {
            if (urls.indexOf(chunk.toLowerCase()) > -1) {
              return console.error('Error! Can\'t segment URL!');
            } else {
              var length = 140 - (tweet.length + textLength + mentionsLength);
              var chunkA = chunk.substr(0, length);
              var chunkB = chunk.substr(length);

              tweet.push(chunkA);
              textLength += length;

              chunks.unshift(chunkB);
            }
          } else { // push it to the next tweet
            chunks.unshift(chunk);
          }
          break;
        }
        tweet.push(chunk);
        textLength += length;
      }
      tweets.push(tweet.join(' '));
    }

    postTweetChain(tweets, tweet.id, e.sender)
  } else {
    // ..and then post them to Twitter..
    if (tweet.id !== undefined) {
      // ..with an ID attached (as reply)
      twitter.post('statuses/update', { status: tweet.text, in_reply_to_status_id: tweet.id }, function (err, data, response) {
        if (err) return console.log(err)
        e.sender.send('surfird:hook:success:tweet');
      })
    } else {
      // ..with no ID attached (as puretweet)
      twitter.post('statuses/update', { status: tweet.text }, function (err, data, response) {
        if (err) return console.log(err)
        e.sender.send('surfird:hook:success:tweet');
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
