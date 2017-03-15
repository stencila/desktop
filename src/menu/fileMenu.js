let createMenuClickHandler = require('./createMenuClickHandler')

module.exports = function fileMenu(appState) {
  let fileMenu = {
    label: 'File',
    submenu: [
      {
        label: 'Save',
        accelerator: 'CommandOrControl+S',
        enabled: appState.hasPendingChanges,
        click: createMenuClickHandler('save:requested')
      }
    ]
  }
  return fileMenu
}
