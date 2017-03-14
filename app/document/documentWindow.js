const { DocumentPage, MemoryBackend, getQueryStringParam } = window.stencila
let stubBackend = new MemoryBackend()

const remote = require('electron').remote
const { Menu } = remote
const ipc = require('electron').ipcRenderer
const currentWindow = remote.getCurrentWindow()
const windowId = currentWindow.id

const DocumentMenuBuilder = require('./DocumentMenuBuilder')
const documentMenuBuilder = new DocumentMenuBuilder()
const AppState = require('./AppState')

let appState = {}

function _updateMenu() {
  let menu = documentMenuBuilder.build(appState)
  console.log('setting document menu', menu)
  Menu.setApplicationMenu(menu)
}

currentWindow.on('focus', () => {
  console.log('document window focused')

  // Set up the menu for the dashboard
  _updateMenu(appState)

  ipc.send('windowFocused', {
    windowId: windowId,
    data: 'dashboard'
  })
})

ipc.on('save', function() {
  console.log('saving document')
  alert('saving document')
})

_updateMenu(appState)
// appState = new AppState(ipc)

window.addEventListener('load', () => {
  console.info('Loading...', getQueryStringParam('archiveURL'))
  let archiveURL = getQueryStringParam('archiveURL') || '/examples/kitchen-sink'

  window.documentPage = DocumentPage.mount({
    backend: stubBackend,
    appState,
    archiveURL: archiveURL
  }, window.document.body)
})
