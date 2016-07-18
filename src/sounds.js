const { shell, ipcMain } = require('electron');
const fs = require('fs');

module.exports = function(app, mainWindow) {
    ipcMain.on("surfbird:send:sounds", function(e) {
        fs.readdir(app.getPath("music"), function(err, files) {
            if (files !== undefined) {
                files.forEach(function(sound) {
                    if (sound.indexOf('.ogg') > -1 || sound.indexOf('.mp3') > -1) {
                        var sd = {name: sound.split(".")[0], fullpath: app.getPath("music") + sound}

                        mainWindow.webContents.send('surfbird:get:sounds', sd)
                    }
                })
            }
        })
    })

    ipcMain.on("surfbird:open:sounds", function(e) {
        shell.openExternal("file:///" + app.getPath("music"))
    })
}