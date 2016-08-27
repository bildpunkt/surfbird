/*
 * interactions.js
 * part of the Surfbird Twitter client
 *
 * Author: Andreas N. <git@pixelde.su>
 * Entrypoint: src/windows/main.js
 *
 * This file provides streams of interactions fetched from the API
 * and sends it over IPC channels to the client frontend
 *
 * Includes a reference from mainWindow to use IPC channels,
 * and a reference to the user stream to fetch data from it
 *
 */

const tokens = require('../storage/tokens')

var currentUser = tokens.get('access_token').split('-')[0]
var events = ['favorite',
              'unfavorite',
              'follow',
              'list_member_added',
              'list_member_removed',
              'quoted_tweet',
              'retweeted_retweet',
              'favorited_retweet']

module.exports = function (mainWindow, stream) {
  events.forEach(function (eventName) {
    stream.on(eventName, function (event) {
      if (event.target.id_str === currentUser) {
        var time = new Date()
        var ev = { type: eventName, event: event, created_at: time.getTime() }

        mainWindow.webContents.send('surfbird:get:interactions', ev)
      }
    })
  })
}
