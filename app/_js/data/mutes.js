const ipcRenderer = require('electron').ipcRenderer

module.exports = function (app) {
  ipcRenderer.on('surfbird:get:mutes', function (e, user) {
    app.mutes.users.push(user.screen_name)
  })
}
