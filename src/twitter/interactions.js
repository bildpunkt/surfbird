const { ipcMain } = require('electron');
const twitter = require('../twitter');
const storage = require('../storage');

var stream = twitter.stream('user', { with: "followings", include_rts: "false"})
var current_user = storage.get('access_token').split("-")[0]
var events = ['favorite', 
              'unfavorite', 
              'follow', 
              'list_member_added', 
              'list_member_removed', 
              'quoted_tweet', 
              'retweeted_retweet', 
              'favorited_retweet']

module.exports = function(mainWindow) {
    events.forEach(function(event_name) {
        stream.on(event_name, function (event) {
            if (event.target.id_str == current_user) {
                var ev = {type: event_name, event: event}
                
                mainWindow.webContents.send('linnun:interactions', ev);
            }
        })
    })
}
