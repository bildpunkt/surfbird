/*
 * mentions.js
 * part of the Surfbird Twitter client
 *
 * Author: Andreas N. <git@pixelde.su>
 * Entrypoint: src/twitter/initial.js
 *
 * This file provides a stream of mentions fetched from the API
 * and sends it over IPC channels to the client frontend
 *
 * Includes a reference from mainWindow to use IPC channels,
 * and a reference of the username from the inital data call
 *
 */

const twitter = require('../twitter')

module.exports = function (mainWindow, current_user) {
  var stream = twitter.stream('statuses/filter', {track: '@' + current_user})

  stream.on('tweet', function (tweet) {
    var ev = {type: 'mention', event: tweet}

    mainWindow.webContents.send('surfbird:get:interactions', ev)
  })
}
