import { BrowserWindow } from 'electron'
import NodeTwitterAPI from 'node-twitter-api'

let authWindow = null

export default {
  authenticate (credentials, callback) {
    const twitterAuth = new NodeTwitterAPI({
      callback: credentials['callbackURL'],
      consumerKey: credentials['consumerKey'],
      consumerSecret: credentials['consumerSecret']
    })

    twitterAuth.getRequestToken((error, requestToken, requestTokenSecret) => {
      if (error) {
        // TODO: Send event to main window
        throw Error('Something went wrong while autenticating with Twitter: ' + error.data)
      }

      const url = twitterAuth.getAuthUrl(requestToken)

      authWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
          nodeIntegration: false
        }
      })

      authWindow.webContents.on('will-navigate', (e, url) => {
        const matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)

        if (matched) {
          e.preventDefault()

          twitterAuth.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
            if (error) {
              // TODO: Send event to main window
              throw Error('Something went wrong while autenticating with Twitter: ' + error.data)
            }

            let token = {
              service: 'twitter',
              accessToken: accessToken,
              accessTokenSecret: accessTokenSecret
            }

            callback(token)

            if (authWindow) {
              authWindow.close()
              authWindow = null
            }
          })
        } else if (url.match(/\/account\/login_verification/)) {
          // Two-Factor Authentication
        } else if (url.match(/\/account\/login_challenge/)) {
          // Login Challenge
        } else if (url.match(/\/oauth\/authenticate/)) {
          // OAuth Verification Callback
        } else if (url.match(/\/oauth\/authorize/)) {
          // OAuth Authorization
        } else {
          e.preventDefault()

          // TODO: Send event to main window
          throw Error('Something went wrong while autenticating with Twitter')
        }
      })

      authWindow.loadURL(`${url}&force_login=true`)
    })
  }
}
