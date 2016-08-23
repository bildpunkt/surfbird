const { app, BrowserWindow, shell, ipcMain } = require('electron')
const tokens = require('../storage/tokens')
const path = require('path')

let mainWindow

module.exports = function () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    title: 'Surfbird',
    autoHideMenuBar: true,
    webPreferences: {
      blinkFeatures: 'CSSBackdropFilter'
    }
  })

  const currentUser = tokens.get('access_token').split('-')[0]

  mainWindow.loadURL(path.join('file://', __dirname, '/../../app/index.html'))

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const page = mainWindow.webContents

  mainWindow.openDevTools()

  page.on('dom-ready', () => {
    mainWindow.show()
  })

  page.on('new-window', (e, url) => {
    e.preventDefault()

    shell.openExternal(url)
  })

  ipcMain.on('surfbird:logout', function (e) {
    tokens.clear()
    app.relaunch()
    app.quit()
  })

  require('../twitter/actions')
  require('../twitter/tweet')(mainWindow)
  require('../twitter/interactions')(mainWindow)
  require('../twitter/initial')(mainWindow, currentUser)
  require('../storage/themes')(app, mainWindow)
  require('../storage/sounds')(app, mainWindow)
}
