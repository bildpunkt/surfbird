const { BrowserWindow, shell } = require('electron')
const keys = require('../storage/keys')
const tokens = require('../storage/tokens')
const createWindow = require('./main')

let authWindow, rqt, rqts

module.exports = function () {
  authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Surfbird - Authenticate with Twitter',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  })

  if (keys.get('callback_url') === 'YOUR_URL_HERE') {
    throw new Error("Callback URL empty, without this the client can't authenticate properly")
  }

  const twitterAuth = require('../twitter-auth')

    /* developer workaround ;) */
  if (keys.get('pin') !== void 8 && keys.get('callback_url') === 'oob') {
    var rot = keys.get('pin').split(':')
    twitterAuth.getAccessToken(rot[0], rot[1], rot[2], function (error, accessToken, accessTokenSecret, results) {
      if (error) {
        console.log(error)
      } else {
        tokens.set('pin', null)
        tokens.set('access_token', accessToken)
        tokens.set('access_token_secret', accessTokenSecret)
        authPage.session.clearCache(function () {})

        createWindow()
        authWindow.close()
      }
    })
  }

  twitterAuth.getRequestToken(function (error, requestToken, requestTokenSecret, results) {
    if (error) {
      console.log('Error getting OAuth request token : ' + error.data)
    } else {
      authWindow.loadURL(twitterAuth.getAuthUrl(requestToken))
      rqt = requestToken
      rqts = requestTokenSecret
    }
  })

  const authPage = authWindow.webContents

  authWindow.on('closed', () => {
    authWindow = null
  })

  authPage.on('dom-ready', () => {
    authWindow.show()
  })

  authPage.on('new-window', (e, url) => {
    e.preventDefault()

    shell.openExternal(url)
  })

  authPage.on('will-navigate', function (e, url) {
		                                          if (url.indexOf('oauth_verifier=') > 0) { // If the callback page is loaded
			                    authWindow.hide()
			                    const oauth_verifier = (url.substring(url.indexOf('oauth_verifier='), url.length)).replace('oauth_verifier=', '') // Get the oauthVerifier token

  twitterAuth.getAccessToken(rqt, rqts, oauth_verifier, function (error, accessToken, accessTokenSecret, results) {
    if (error) {
      console.log(error)
    } else {
      tokens.set('access_token', accessToken)
      tokens.set('access_token_secret', accessTokenSecret)
      authPage.session.clearCache(function () {})

      authPage.session.cookies.remove('https://twitter.com', '_twitter_sess', function (e) { /* nothing */ })
      authPage.session.cookies.remove('https://twitter.com', 'auth_token', function (e) { /* nothing */ })
      createWindow()
      authWindow.close()
    }
  })
}
  })
}
