const ipcRenderer = require('electron').ipcRenderer

module.exports = function (app) {
  ipcRenderer.on('surfbird:get:themes', function (e, theme) {
      // the probably most stylish way to check if an array of objects contains a specific object
      // joking, I actually hate this approach, thank you JS
    if (!(JSON.stringify(app.themes).indexOf(JSON.stringify(theme)) > 0)) {
      app.themes.push(theme)
    }
  })
}
