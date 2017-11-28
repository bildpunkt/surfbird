# Application Flow

This document will detail the application flow Surfbird is following at the time of writing (and will be updated accordingly with changes)

## Main Process

The main process is a combination of Electron and Node.js APIs being prepared. The [main script file](https://github.com/surfbirdapp/surfbird/blob/master/src/main/index.js) creates the BrowserWindow and initializes all required events on it.

The created BrowserWindow then loads the generated HTML file with our renderer script.

## Renderer Process

The renderer process is where most of the action is going on. It includes Vue, style and client libraries to access the microblogging services implemented.