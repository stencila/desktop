const { BrowserWindow } = require('electron')

/*
  Sends an event of the given event name to the focused window
*/
module.exports = function createMenuHandler(eventName) {
  return function() {
    let focusedWindow = BrowserWindow.getFocusedWindow()
    focusedWindow.send(eventName)
  }
}
