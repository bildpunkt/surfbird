const {app, BrowserWindow, ipcMain} = require('electron')
const installExtension = require('electron-devtools-installer')
const path = require('path')
const url = require('url')

let win

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Surfbird',
    autoHideMenuBar: true,
    frame: false
  })

  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .catch((err) => console.log('An error occurred: ', err))

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app', 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

  ipcMain.on('surfbird:window:close', function (e) {
    win.close()
  })

  ipcMain.on('surfbird:window:maximize', function (e) {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })

  ipcMain.on('surfbird:window:minimize', function (e) {
    win.minimize()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
