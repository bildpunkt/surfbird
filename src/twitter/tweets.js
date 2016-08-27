/*
 * tweets.js
 * part of the Surfbird Twitter client
 *
 * Author: Andreas N. <git@pixelde.su>
 * Entrypoint: src/windows/main.js
 *
 * This file provides a stream of tweets fetched from the API
 * and sends it over IPC channels to the client frontend
 *
 * Includes a reference from mainWindow to use IPC channels,
 * and a reference to the user stream to fetch data from it
 *
 */

module.exports = function (mainWindow, stream) {
  stream.on('tweet', function (tweet) {
    tweet.created_at = tweet.timestamp_ms

    mainWindow.webContents.send('surfbird:get:tweets', tweet)
  })
}
