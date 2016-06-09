'use strict';

const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, shell, ipcMain } = require('electron');
const root = path.join(path.dirname(fs.realpathSync(__filename)));
const storage = require('./src/storage');

let mainWindow, authWindow, rqt, rqts, act, acts, oauth_verifier;

if (storage.get('consumer_key') == 'YOUR_KEYS_HERE') {
    throw new Error('Twitter keys not defined, please add your consumer keys to linnun.json!')
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
        title: 'Linnun',
        autoHideMenuBar: true
    });

    const twitter = require('./src/twitter');

    mainWindow.loadURL('file://' + __dirname + '/app/index.html')

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const page = mainWindow.webContents;

    mainWindow.openDevTools();

    page.on('dom-ready', () => {
        mainWindow.show();
        
        fs.readdir('./app/assets/themes/', function(err, files) {
            files.forEach(function(theme) {
                if (theme.indexOf('.css') > -1) {
                    mainWindow.webContents.send('linnun:themes', theme)
                }
            })
        })
    });

    page.on('new-window', (e, url) => {
        e.preventDefault();

        shell.openExternal(url);
    });
    
    var stream = twitter.stream('user', { with: "followings", include_rts: "false"})

    // Let's get our tweets,..
    stream.on('tweet', function (tweet) {
        // ..manipulate the time to be a unix timestamp...
        tweet.created_at = tweet.timestamp_ms

        // ..and send them to our client!
        mainWindow.webContents.send('linnun:tweets', tweet);
    })

    ipcMain.on('linnun:home-timeline', function(e) {
      twitter.get('statuses/home_timeline', function(e, tweets) {
        tweets.forEach(function(tweet) {
          mainWindow.webContents.send('linnun:tweets', tweet);
        });
      });
    });

    require('./src/twitter/actions');
}

function createAuthWindow() {
    authWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Linnun',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false
        }
    });

    if (storage.get('callback_url') == 'YOUR_URL_HERE') {
        throw new Error("Callback URL empty, without this the client can't authenticate properly")
    }

    const twitterAuth = require('./src/twitter-auth');

    /* developer workaround ;) */
    if(storage.get('pin') !== void 8 && storage.get('callback_url') == 'oob') {
      var rot = storage.get('pin').split(':');
      twitterAuth.getAccessToken(rot[0], rot[1], rot[2], function(error, accessToken, accessTokenSecret, results) {
          if (error) {
              console.log(error);
          } else {
              storage.set('pin', null);
              storage.set('access_token', accessToken)
              storage.set('access_token_secret', accessTokenSecret)
              authPage.session.clearCache(function() {});

              createWindow()
              authWindow.close()
          }
      })
    }

    twitterAuth.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error.data);
        } else {
            authWindow.loadURL(twitterAuth.getAuthUrl(requestToken))
            rqt = requestToken
            rqts = requestTokenSecret
        }
    });

    const authPage = authWindow.webContents;

    authWindow.on('closed', () => {
        authWindow = null
    });

    authPage.on('dom-ready', () => {
        authWindow.show();
    });

    authPage.on('new-window', (e, url) => {
        e.preventDefault();

        shell.openExternal(url);
    });

    authPage.on("will-navigate", function(e, url) {
		if(url.indexOf("oauth_verifier=") > 0) { // If the callback page is loaded
			authWindow.hide();
			const oauth_verifier = (url.substring(url.indexOf("oauth_verifier="), url.length)).replace("oauth_verifier=", ""); // Get the oauthVerifier token

            twitterAuth.getAccessToken(rqt, rqts, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
                if (error) {
                    console.log(error);
                } else {
                    storage.set('access_token', accessToken)
                    storage.set('access_token_secret', accessTokenSecret)
                    authPage.session.clearCache(function() {});

                    createWindow()
                    authWindow.close()
                }
            })
        }
    })
}

if (storage.get('access_token') == 'YOUR_KEYS_HERE') {
    app.on('ready', createAuthWindow);
} else {
    app.on('ready', function() {
        createWindow()
    });
}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
