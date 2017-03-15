/* window process */
const { FileSystemBackend } = require('stencila-node')
const remote = require('electron').remote
const path = require('path')
const fs = require('fs')
const { app } = remote
const welcomeToStencila = require('../examples/welcomeToStencila')
const uuid = require('./uuid')

const DOCUMENTS_DIR = app.getPath('documents')
const STENCILA_LIBRARY_DIR = path.join(DOCUMENTS_DIR, 'Stencila')
const STENCILA_LIBRARY_FILE = path.join(STENCILA_LIBRARY_DIR, 'library.json')
const fileSystemBackend = new FileSystemBackend(STENCILA_LIBRARY_DIR)

/*
  Seeds the filesystem backend if necessary. This means that a file
  library.json gets created in STENCILA_LIBRARY_DIR if not present.

  NOTE: This is done synchronously for now. It won't take much time.
*/
function initLibrary() {
  if (!fs.existsSync(STENCILA_LIBRARY_FILE)) {

    let documentId = uuid()
    // Create the needed folders
    if (!fs.existsSync(STENCILA_LIBRARY_DIR)) {
      fs.mkdir(STENCILA_LIBRARY_DIR)
    }
    fs.mkdir(path.join(STENCILA_LIBRARY_DIR, documentId))

    fs.writeFileSync(
      path.join(STENCILA_LIBRARY_DIR, documentId, 'index.html'),
      welcomeToStencila,
      'utf8'
    )
    fs.writeFileSync(
      STENCILA_LIBRARY_FILE,
      _libraryFile(documentId),
      'utf8'
    )
  }
}

function _libraryFile(documentId) {
  let libraryData = {}

  libraryData[documentId] = {
    "type": "document",
    "title": "Welcome to Stencila",
    "createdAt": "2017-03-10T00:03:12.060Z",
    "modifiedAt": "2017-03-10T00:03:12.060Z",
    "openedAt": "2017-03-10T00:03:12.060Z"
  }
  return JSON.stringify(libraryData, null, '  ')
}

initLibrary()

module.exports = fileSystemBackend
