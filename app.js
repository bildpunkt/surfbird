const {app, BrowserWindow} = require('electron')
const installExtension = require('electron-devtools-installer')
const path = require('path')
const url = require('url')

let win

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Surfbird',
    autoHideMenuBar: true
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
