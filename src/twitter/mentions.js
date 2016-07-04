const { ipcMain } = require('electron');
const twitter = require('../twitter');
const storage = require('../storage');

module.exports = function(mainWindow, current_user) {
    var stream = twitter.stream('statuses/filter', {track: "@" + current_user})

    stream.on('tweet', function (tweet) {
        var ev = {type: "mention", event: tweet}

        mainWindow.webContents.send('surfbird:get:interactions', ev);
    })
}