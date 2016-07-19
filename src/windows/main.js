const { app, BrowserWindow, shell, ipcMain } = require('electron');
const keys = require('../storage/keys');
const tokens = require('../storage/tokens');

let mainWindow;

module.exports = function() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
        title: 'Surfbird',
        autoHideMenuBar: true
    });

    const twitter = require('../twitter');
    const current_user = tokens.get('access_token').split("-")[0]

    mainWindow.loadURL('file://' + __dirname + '/../../app/index.html')

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

    ipcMain.on('surfbird:logout', function(e) {
      tokens.clear()
      app.relaunch()
      app.quit()
    })

    require('../twitter/actions');
    require('../twitter/interactions')(mainWindow);
    require('../twitter/initial')(mainWindow, current_user);
    require('../storage/themes')(app, mainWindow);
    require('../storage/sounds')(app, mainWindow);
}