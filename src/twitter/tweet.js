const { ipcMain } = require('electron');
const twitter = require('../twitter');

module.exports = function(mainWindow) {
  var stream = twitter.stream('user', { with: "followings", include_rts: "false"})

  // Let's get our tweets,..
  stream.on('tweet', function (tweet) {
      // ..manipulate the time to be a unix timestamp...
      tweet.created_at = tweet.timestamp_ms

      // ..and send them to our client!
      mainWindow.webContents.send('surfbird:get:tweets', tweet);
  })
}
