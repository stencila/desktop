const { DocumentPage, MemoryBackend, getQueryStringParam } = window.stencila
let stubBackend = new MemoryBackend()

const remote = require('electron').remote
const { Menu } = remote
const ipc = require('electron').ipcRenderer
const DocumentMenuBuilder = require('./DocumentMenuBuilder')
const currentWindow = remote.getCurrentWindow()
const windowId = currentWindow.id
const documentMenuBuilder = new DocumentMenuBuilder()
const AppState = require('./AppState')

let appState = new AppState()

function _updateMenu() {
  let menu = documentMenuBuilder.build(appState)
  Menu.setApplicationMenu(menu)
}

appState.on('change', () => {
  _updateMenu(appState)
})

currentWindow.on('focus', () => {
  _updateMenu(appState)

  ipc.send('windowFocused', {
    windowId: windowId,
    data: 'dashboard'
  })
})

ipc.on('command:executed', function(sender, data) {
  window.documentPage.executeCommand(data.commandName, data.commandParams)
})

ipc.on('save', function() {
  console.log('saving document')
  alert('saving document')
})

_updateMenu(appState)
// appState = new AppState(ipc)

window.addEventListener('load', () => {
  let archiveURL = getQueryStringParam('archiveURL') || '/examples/kitchen-sink'

  window.documentPage = DocumentPage.mount({
    backend: stubBackend,
    appState,
    archiveURL: archiveURL
  }, window.document.body)
})
