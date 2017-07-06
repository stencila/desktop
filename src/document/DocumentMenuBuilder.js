const { Menu } = require('electron').remote

const macOSAboutMenu = require('../menu/macOSAboutMenu')
const fileMenu = require('../menu/fileMenu')
const editMenu = require('../menu/editMenu')
// const annotateMenu = require('../menu/annotateMenu')
// const insertMenu = require('../menu/insertMenu')
const viewMenu = require('../menu/viewMenu')
const windowMenu = require('../menu/windowMenu')

class DocumentMenuBuilder {
  /*
    Build a fresh document editor menu, based on current app state
  */
  build(appState) {
    let documentMenu = []
    if (process.platform === 'darwin') {
      documentMenu.push(macOSAboutMenu)
    }
    documentMenu.push(fileMenu(appState))
    documentMenu.push(editMenu(appState))
    // documentMenu.push(annotateMenu(appState))
    // documentMenu.push(insertMenu(appState))
    documentMenu.push(viewMenu(appState))
    documentMenu.push(windowMenu(appState))
    return Menu.buildFromTemplate(documentMenu)
  }

  /*
    Update the menu (setting enabled states correctly) without replacing it
  */
  update(appState) {
    console.warn('DocumentMenuBuilder.update not yet implemented', appState)
  }
}

module.exports = DocumentMenuBuilder
