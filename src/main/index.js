'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import Authentication from './authentication'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    title: 'Surfbird',
    autoHideMenuBar: true,
    frame: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  ipcMain.on('surfbird:window:close', function (e) {
    mainWindow.close()
  })

  ipcMain.on('surfbird:window:maximize', function (e) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.on('surfbird:window:minimize', function (e) {
    mainWindow.minimize()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('surfbird:request:accounts', (e) => {
  e.sender.send('surfbird:get:accounts', Authentication.allAccounts())
})

ipcMain.on('surfbird:request:services', (e) => {
  e.sender.send('surfbird:get:services', Authentication.allServices())
})

ipcMain.on('surfbird:authentication:start', (e, data) => {
  // eslint-disable-next-line no-new
  new Authentication(data.service, (tokens) => {
    Authentication.addToken(tokens, () => {
      e.sender.send('surfbird:authentication:done', tokens)
    })
  })
})
