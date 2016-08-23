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
 * and a reference of the mention stream to fetch data from it
 *
 */

module.exports = function (mainWindow, stream) {
  stream.on('tweet', function (tweet) {
    var ev = {type: 'mention', event: tweet}

    mainWindow.webContents.send('surfbird:get:interactions', ev)
  })
}
