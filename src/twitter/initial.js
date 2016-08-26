/*
 * initial.js
 * part of the Surfbird Twitter client
 *
 * Author: Andreas N. <git@pixelde.su>
 * Entrypoint: src/windows/main.js
 *
 * This file provides initial data calls (user, home, mentions)
 * and sends them over IPC channels to the client frontend
 *
 * Includes a reference from mainWindow to use IPC channels,
 * and the current_user id, which is split from the access token
 *
 */

const { ipcMain } = require('electron')
const twitter = require('../twitter')

module.exports = function (mainWindow, currentUser) {
  ipcMain.on('surfbird:send:home-timeline', function (e) {
    twitter.get('statuses/home_timeline', function (e, tweets) {
      tweets.forEach(function (tweet) {
        mainWindow.webContents.send('surfbird:get:tweets', tweet)
      })
    })
  })

  ipcMain.on('surfbird:send:mentions-timeline', function (e) {
    twitter.get('statuses/mentions_timeline', function (e, tweets) {
      tweets.reverse().forEach(function (tweet) {
        var time = new Date()
        var ev = { type: 'mention', event: tweet, created_at: time.getTime() }
        mainWindow.webContents.send('surfbird:get:interactions', ev)
      })
    })
  })

  ipcMain.on('surfbird:send:user', function (e) {
    twitter.get('users/show', {user_id: currentUser}, function (e, data) {
      mainWindow.webContents.send('surfbird:get:user', data)

      const mStream = require('../stream/mention')(data.screen_name)
      require('./mentions')(mainWindow, mStream)
    })
  })
}
