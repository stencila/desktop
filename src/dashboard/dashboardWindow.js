const { Dashboard } = window.stencila
const remote = require('electron').remote
const ipc = require('electron').ipcRenderer
const currentWindow = remote.getCurrentWindow()
const { Menu } = remote
const windowId = currentWindow.id
const DashboardMenuBuilder = require('./DashboardMenuBuilder')
const dashboardMenuBuilder = new DashboardMenuBuilder()
const initBackend = require('../shared/initBackend')
const path = require('path')
const fs = require('fs')
const {dialog} = require('electron').remote

const emptyDocument = fs.readFileSync(
  path.join(__dirname, '../data/empty.html'),
  'utf8'
)


let appState = {}

function _updateMenu() {
  let menu = dashboardMenuBuilder.build(appState)
  Menu.setApplicationMenu(menu)
}

function resolveEditorURL(type, documentId) {
  let editorURL
  if (type === 'document') {
    editorURL = "document.html"
  } else {
    editorURL = "sheet.html"
  }
  editorURL += '?documentId='+encodeURIComponent(documentId)
  return editorURL
}

currentWindow.on('focus', () => {
  // Set up the menu for the dashboard
  _updateMenu(appState)
  // HACK: this fetches the latest library data
  window.dashboard.reload()

  ipc.send('windowFocused', {
    windowId: windowId,
    data: 'dashboard'
  })
})

// Initially set the menu when the window is first opened
_updateMenu(appState)

window.addEventListener('load', () => {
  initBackend().then((backend) => {

    ipc.on('new:document', function() {
      backend.createDocument(emptyDocument).then((documentId) => {
        window.open(resolveEditorURL('document', documentId))
        window.dashboard.reload()
      })
    })

    ipc.on('open:document', function() {
      dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
          {name: 'Documents', extensions: ['html', 'md', 'Rmd', 'ipynb']}
        ]
      }, function(filePaths) {
        let filePath = filePaths[0]
        backend.importFile(filePath).then(() => {
          window.dashboard.reload()
        })
      })
    })

    window.dashboard = Dashboard.mount({
      backend,
      resolveEditorURL
    }, window.document.body)
  })
})
