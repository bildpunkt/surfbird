const ipcRenderer = require('electron').ipcRenderer

module.exports = function (vm, app) {
  ipcRenderer.on('surfbird:get:user', function (e, user) {
    app.user = user
    vm.$set('user', user)
  })
}