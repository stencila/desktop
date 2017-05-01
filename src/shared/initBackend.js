/* window process */
const { FileSystemBackend } = require('stencila-node')
const remote = require('electron').remote
const path = require('path')
const fs = require('fs')
const { app } = remote

const DOCUMENTS_DIR = app.getPath('documents')
const STENCILA_LIBRARY_DIR = path.join(DOCUMENTS_DIR, 'Stencila-0.26.0')
const STENCILA_LIBRARY_FILE = path.join(STENCILA_LIBRARY_DIR, 'library.json')
const fileSystemBackend = new FileSystemBackend(STENCILA_LIBRARY_DIR)

/*
  Seeds the filesystem backend if necessary. This means that a file
  library.json gets created in STENCILA_LIBRARY_DIR if not present.

  NOTE: This is done synchronously for now. It won't take much time.
*/
function initBackend() {
  if (!fs.existsSync(STENCILA_LIBRARY_FILE)) {

    // Create the needed folders
    if (!fs.existsSync(STENCILA_LIBRARY_DIR)) {
      fs.mkdirSync(STENCILA_LIBRARY_DIR)
    }
    // Create empty library file
    fs.writeFileSync(path.join(STENCILA_LIBRARY_DIR, 'library.json'), '{}', 'utf8')

    let documentIds = Object.keys(window.GUIDES)

    let createDocument = (documentId) => {
      let html = window.GUIDES[documentId]
      return fileSystemBackend.createDocument(html)
    }

    let runTasksInSeries = documentIds.reduce(function(p, documentId) {
      return p.then(function() {
        return createDocument(documentId)
      })
    }, Promise.resolve())

    return runTasksInSeries.then(() => {
      return fileSystemBackend
    })

  } else {
    // Nothing to do - just resolve the promise
    return Promise.resolve(fileSystemBackend)
  }
}

module.exports = initBackend
