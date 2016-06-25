const { ipcMain } = require('electron');
const twitter = require('../twitter');

// Let's wait for sent tweets..
ipcMain.on('linnun:send:tweet', function(e, tweet) {
    // ..and then post them to Twitter..
    if (tweet.id !== undefined) {
        // ..with an ID attached (as reply)
        twitter.post('statuses/update', { status: tweet.text, in_reply_to_status_id: tweet.id }, function(err, data, response) {
            // do nothing!
        })
    } else {
        // ..with no ID attached (as puretweet)
        twitter.post('statuses/update', { status: tweet.text }, function(err, data, response) {
        // do nothing!
        })
    }

});

// Let's wait for retweets..
ipcMain.on('linnun:send:retweet', function(e, tweet) {
    // ..and then post them to Twitter
    if (tweet.type == "retweet") {
        twitter.post('statuses/retweet/:id', { id: tweet.id }, function (err, data, response) {
            // do nothing!
        })
    } else if (tweet.type == "unretweet") {
        twitter.post('statuses/unretweet/:id', { id: tweet.id }, function (err, data, response) {
            // do nothing!
        })
    }
})

// Let's wait for favorites..
ipcMain.on('linnun:send:favorite', function(e, tweet) {
    // ..and then post them to Twitter
    if (tweet.type == "favorite") {
        twitter.post('favorites/create', { id: tweet.id }, function (err, data, response) {
            // do nothing!
        })
    } else if (tweet.type == "unfavorite") {
        twitter.post('favorites/destroy', { id: tweet.id }, function (err, data, response) {
            // do nothing!
        })
    }
})