const path = require('path');
const { app } = require('electron');

module.exports = function() {
    // Theme path creation
    var thp = ""
    if (process.platform == "win32") {
        thp = "\\themes\\"
    } else {
        thp = "/themes/"
    }

    fs.mkdir(app.getPath("userData") + thp ,function(e) {
        if (e && e.code !== "EEXIST") {
            console.log(e)
        }
    })
    app.setPath("documents", app.getPath("userData") + thp)

    // Sounds path creation
    var sp = ""
    if (process.platform == "win32") {
        sp = "\\sounds\\"
    } else {
        sp = "/sounds/"
    }

    fs.mkdir(app.getPath("userData") + sp ,function(e) {
        if (e && e.code !== "EEXIST") {
            console.log(e)
        }
    })
    app.setPath("music", app.getPath("userData") + sp)
}