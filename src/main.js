const electron = require('electron')
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

const { app, ipcMain, Menu } = electron // eslint-disable-line no-unused-vars

// Run a Stencila Node.js host to provide execution contexts etc
const { host } = require('stencila-node')
host.run()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dashboard.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Menu.setApplicationMenu(menu1)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// ipcMain.on('updateWindowAppState', (event, message) => {
//   console.log('RECEIVED FOO EVENT', message)
//   // windowAppStates[message.windowId] = message.appState
//   // Updates toolbars
//   updateWindowAppStates(windowAppStates)
//
//   if (message.data === 'document') {
//     console.log('switch to menu1')
//     Menu.setApplicationMenu(menu1)
//   } else {
//     console.log('switch to menu2')
//     Menu.setApplicationMenu(menu2)
//   }
// })
