module.exports = function fileMenu(appState) {
  let fileMenu = {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CommandOrControl+O',
        click() { console.warn('TODO: show open file dialog') }
      },
      {
        label: 'Save',
        accelerator: 'CommandOrControl+S',
        enabled: appState.hasPendingChanges,
        click() { console.warn('TODO: connect save handler') }
      }
    ]
  }
  return fileMenu
}
