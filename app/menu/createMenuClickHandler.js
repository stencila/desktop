const currentWindow = require('electron').remote.getCurrentWindow()
/*
  Sends an event of the given event name to the focused window
*/
module.exports = function createMenuHandler(eventName, data) {
  return function() {
    currentWindow.send(eventName, data)
  }
}
