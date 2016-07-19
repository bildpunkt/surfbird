const { ipcMain } = require('electron');
const twitter = require('../twitter');

module.exports = function(mainWindow, current_user) {
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

          require('./mentions')(mainWindow, data.screen_name);
      })
    });
}