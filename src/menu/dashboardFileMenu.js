let createMenuClickHandler = require('./createMenuClickHandler')

module.exports = function dashboardFileMenu() {
  let fileMenu = {
    label: 'File',
    submenu: [
      {
        label: 'Import',
        click: createMenuClickHandler('import:document')
      },
      {
        label: 'New Document',
        accelerator: 'CommandOrControl+N',
        click: createMenuClickHandler('new:document')
      }
    ]
  }
  return fileMenu
}
