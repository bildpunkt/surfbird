'use strict';

const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, shell, ipcMain } = require('electron');
const root = path.join(path.dirname(fs.realpathSync(__filename)));
const keys = require('./src/keys');
const tokens = require('./src/tokens');

let mainWindow, authWindow, rqt, rqts, act, acts, oauth_verifier;

if (keys.get('consumer_key') == 'YOUR_KEYS_HERE') {
    throw new Error('Twitter keys not defined, please add your consumer keys to surfbird.json!')
}

var thp = ""
if (process.platform == "win32") {
    thp = "\\themes\\"
} else {
    thp = "/themes/"
}

fs.mkdir(app.getPath("userData") + thp ,function(e) {
    if (e && e.code !== "EEXIST") {
        console.log(e)
    }
})
app.setPath("documents", app.getPath("userData") + thp)

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
        title: 'Surfbird',
        autoHideMenuBar: true
    });

    const twitter = require('./src/twitter');
    const current_user = tokens.get('access_token').split("-")[0]

    mainWindow.loadURL('file://' + __dirname + '/app/index.html')

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const page = mainWindow.webContents;

    mainWindow.openDevTools();

    page.on('dom-ready', () => {
        mainWindow.show();
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
        mainWindow.webContents.send('surfbird:get:tweets', tweet);
    })

    ipcMain.on('surfbird:send:home-timeline', function(e) {
      twitter.get('statuses/home_timeline', function(e, tweets) {
        tweets.forEach(function(tweet) {
          mainWindow.webContents.send('surfbird:get:tweets', tweet);
        });
      });
    });

    ipcMain.on('surfbird:send:mentions-timeline', function(e) {
      twitter.get('statuses/mentions_timeline', function(e, tweets) {
        tweets.forEach(function(tweet) {
          var ev = { type: "mention", event: tweet }
          mainWindow.webContents.send('surfbird:get:interactions', ev);
        });
      });
    });

    ipcMain.on('surfbird:send:user', function(e) {
      twitter.get('users/show', {user_id: current_user}, function(e, data) {
          mainWindow.webContents.send('surfbird:get:user', data);

          require('./src/twitter/mentions')(mainWindow, data.screen_name);
      })
    });

    ipcMain.on('surfbird:logout', function(e) {
      tokens.clear()
      app.relaunch()
      app.quit()
    })

    require('./src/twitter/actions');
    require('./src/twitter/interactions')(mainWindow);
    require('./src/themes')(app, mainWindow);
}

function createAuthWindow() {
    authWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Surfbird - Authenticate with Twitter',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false
        }
    });

    if (keys.get('callback_url') == 'YOUR_URL_HERE') {
        throw new Error("Callback URL empty, without this the client can't authenticate properly")
    }

    const twitterAuth = require('./src/twitter-auth');

    /* developer workaround ;) */
    if(keys.get('pin') !== void 8 && keys.get('callback_url') == 'oob') {
      var rot = keys.get('pin').split(':');
      twitterAuth.getAccessToken(rot[0], rot[1], rot[2], function(error, accessToken, accessTokenSecret, results) {
          if (error) {
              console.log(error);
          } else {
              tokens.set('pin', null);
              tokens.set('access_token', accessToken)
              tokens.set('access_token_secret', accessTokenSecret)
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
                    tokens.set('access_token', accessToken)
                    tokens.set('access_token_secret', accessTokenSecret)
                    authPage.session.clearCache(function() {});
                    
                    authPage.session.cookies.remove("https://twitter.com", "_twitter_sess", function(e) { /* nothing */})
                    authPage.session.cookies.remove("https://twitter.com", "auth_token", function(e) { /* nothing */})
                    createWindow()
                    authWindow.close()
                }
            })
        }
    })
}

if (tokens.get('access_token') == undefined) {
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
