'use strict'

const {app, BrowserWindow} = require('electron')
const stencila = require('stencila')

// Add debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()

// The main window gets stoed in a global variable to
// prevent it from getting garbage collected
let main

// Startup function to create main window
function startup () {
  const win = new BrowserWindow({
    width: 600,
    height: 400
  })
  win.maximize()
  stencila.host.startup().then(() => {
    win.loadURL(stencila.host.url)
  })
  win.on('closed', shutdown)
  return win
}

// Shutdown function destroys main window
function shutdown () {
  main = null
}

// Startup and shutdown events
app.on('activate', () => {
  if (!main) {
    main = startup()
  }
})

app.on('ready', () => {
  main = startup()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
