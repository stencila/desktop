const { app } = require('electron').remote

module.exports = {
  label: app.getName(),
  submenu: [
    {
      role: 'about'
    },
    {
      type: 'separator'
    },
    {
      role: 'hide'
    },
    {
      role: 'hideothers'
    },
    {
      role: 'unhide'
    },
    {
      type: 'separator'
    },
    {
      role: 'quit'
    }
  ]
}
