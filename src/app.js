const {
  getQueryStringParam,
  substanceGlobals,
  platform
} = window.substance

const {
  StencilaDesktopApp
} = window.stencila

const ipc = require('electron').ipcRenderer
const darServer = require('dar-server')
const { FSStorageClient } = darServer
const url = require('url')
const path = require('path')
const remote = require('electron').remote
const { shell } = remote
const host = require('stencila-node').host

// HACK: we should find a better solution to intercept window.open calls
// (e.g. as done by LinkComponent)
window.open = function(url /*, frameName, features*/) {
  shell.openExternal(url)
}

window.addEventListener('load', () => {
  substanceGlobals.DEBUG_RENDERING = platform.devtools

  // Starts the stencila/node Host and connect it
  // to the internal host via the STENCILA_HOSTS
  // variable. There are probably better ways to do this
  // but this works, providing integration with limited changes elsewhere
  host.start().then(() => {
    window.STENCILA_HOSTS = host.urls[0] + '|' + host.key

    StencilaDesktopApp.mount({
      archiveId: getQueryStringParam('archiveDir'),
      ipc,
      url,
      path,
      shell,
      FSStorageClient,
      __dirname
    }, window.document.body)
  })
})

window.addEventListener('beforeunload', () => {
  // Stop the host (and any peer hosts that it has spawned)
  host.stop()
})
