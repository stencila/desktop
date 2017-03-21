let createMenuClickHandler = require('./createMenuClickHandler')

module.exports = function annotateMenu(appState) {
  let toolGroups = appState.get('toolGroups')
  let tools = []
  if (toolGroups) {
    let annoTools = appState.get('toolGroups').get('annotations').tools
    let commandStates = appState.get('commandStates')
    annoTools.forEach((annoTool) => {
      let toolState = commandStates[annoTool.name] || { disabled: true }

      tools.push({
        type: 'checkbox',
        label: annoTool.name,
        enabled: !toolState.disabled,
        checked: Boolean(toolState.active),
        click: createMenuClickHandler('command:executed', {
          commandName: annoTool.name,
          commandParams: { mode: toolState.mode }
        })
      })
    })
  }

  let annotateMenu = {
    label: 'Annotate',
    submenu: tools
  }
  return annotateMenu
}
