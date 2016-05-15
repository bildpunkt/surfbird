'use strict';

const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, shell, ipcMain } = require('electron');
const root = path.join(path.dirname(fs.realpathSync(__filename)));
const moment = require('moment');
const twitter = require('./src/twitter');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
        title: 'Linnun',
        autoHideMenuBar: true
    });

    mainWindow.loadURL('file://' + __dirname + '/app/index.html');

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
}

app.on('ready', createWindow);

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

var stream = twitter.stream('user', { with: "followings", include_rts: "false"})

// Let's get our tweets,..
stream.on('tweet', function (tweet) {
    // ..manipulate the time to be a unix timestamp...
    tweet.created_at = moment(new Date(tweet.created_at)).unix()
    
    // ..and send them to our client!
    mainWindow.webContents.send('linnun-tweets', tweet);
})

// Let's wait for sent tweets..
ipcMain.on('linnun-send', function(e, tweet) {
    // ..and then post them to Twitter..
    if (tweet.id !== undefined) {
        // ..with an ID attached (as reply)
        twitter.post('statuses/update', { status: tweet.text, in_reply_to_status_id: tweet.id }, function(err, data, response) {
            // do nothing!
        })
    } else {
        // ..with no ID attached (as puretweet)
        twitter.post('statuses/update', { status: tweet.text }, function(err, data, response) {
        // do nothing!
        })
    }
    
});

// Let's wait for retweets..
ipcMain.on('linnun-retweet', function(e, tid) {
    // ..and then post them to Twitter
    twitter.post('statuses/retweet/:id', { id: tid }, function (err, data, response) {
        // do nothing!
    })
})

// Let's wait for favorites..
ipcMain.on('linnun-favorite', function(e, tid) {
    // ..and then post them to Twitter
    twitter.post('favorites/create', { id: tid }, function (err, data, response) {
        // do nothing!
    })
})