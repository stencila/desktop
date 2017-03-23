let createMenuClickHandler = require('./createMenuClickHandler')

module.exports = function dashboardFileMenu() {
  let fileMenu = {
    label: 'File',
    submenu: [
      {
        label: 'New Document',
        accelerator: 'CommandOrControl+N',
        click: createMenuClickHandler('new:document')
      },
      {
        label: 'Import',
        click: createMenuClickHandler('import:document')
      }
    ]
  }
  return fileMenu
}
