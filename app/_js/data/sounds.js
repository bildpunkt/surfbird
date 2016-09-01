const ipcRenderer = require('electron').ipcRenderer

module.exports = function(app) {
  ipcRenderer.on('surfbird:get:sounds', function (e, sound) {
    if (!(JSON.stringify(app.sounds).indexOf(JSON.stringify(sound)) > 0)) {
      app.sounds.push(sound)
    }
  })
}