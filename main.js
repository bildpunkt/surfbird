'use strict'

const { app } = require('electron')
const keys = require('./src/storage/keys')
const tokens = require('./src/storage/tokens')
const createWindow = require('./src/windows/main')
const createAuthWindow = require('./src/windows/auth')
require('./src/utils/path')(app)

if (keys.get('consumer_key') === 'YOUR_KEYS_HERE') {
  throw new Error('Twitter keys not defined, please add your consumer keys to surfbird.json!')
}

if (tokens.get('access_token') === undefined) {
  app.on('ready', function () {
    createAuthWindow()
  })
} else {
  app.on('ready', function () {
    createWindow()
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (createWindow === null) {
    createWindow()
  }
})
