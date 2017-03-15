const { Dashboard } = window.stencila
const remote = require('electron').remote
const ipc = require('electron').ipcRenderer
const currentWindow = remote.getCurrentWindow()
const { Menu } = remote
const windowId = currentWindow.id
const DashboardMenuBuilder = require('./DashboardMenuBuilder')
const dashboardMenuBuilder = new DashboardMenuBuilder()
const backend = require('../shared/fileSystemBackend')

let appState = {}

function _updateMenu() {
  let menu = dashboardMenuBuilder.build(appState)
  Menu.setApplicationMenu(menu)
}

currentWindow.on('focus', () => {
  // Set up the menu for the dashboard
  _updateMenu(appState)

  ipc.send('windowFocused', {
    windowId: windowId,
    data: 'dashboard'
  })
})

// Initially set the menu when the window is first opened
_updateMenu(appState)

window.addEventListener('load', () => {

  Dashboard.mount({
    backend,
    resolveEditorURL: function(type, documentId) {
      let editorURL
      if (type === 'document') {
        editorURL = "document.html"
      } else {
        editorURL = "sheet.html"
      }
      editorURL += '?documentId='+encodeURIComponent(documentId)
      return editorURL
    }
  }, window.document.body)
})
