const { Menu } = require('electron').remote

const macOSAboutMenu = require('../menu/macOSAboutMenu')
const fileMenu = require('../menu/fileMenu')
const viewMenu = require('../menu/viewMenu')
const windowMenu = require('../menu/windowMenu')

class DashboardMenuBuilder {
  /*
    Build a fresh document editor menu, based on current app state
  */
  build(appState) {
    let dashboardMenu = []
    if (process.platform === 'darwin') {
      dashboardMenu.push(macOSAboutMenu)
    }
    dashboardMenu.push(fileMenu(appState))
    dashboardMenu.push(viewMenu(appState))
    dashboardMenu.push(windowMenu(appState))
    return Menu.buildFromTemplate(dashboardMenu)
  }

  /*
    Update the menu (setting enabled states correctly) without replacing it
  */
  update(appState) {
    console.warn('DocumentMenuBuilder not yet implemented', appState)
  }
}

module.exports = DashboardMenuBuilder
