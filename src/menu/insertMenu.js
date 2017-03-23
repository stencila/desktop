let createMenuClickHandler = require('./createMenuClickHandler')

module.exports = function annotateMenu(appState) {
  let toolGroups = appState.get('toolGroups')
  let labelProvider = appState.get('labelProvider')
  let tools = []
  if (toolGroups) {
    let annoTools = appState.get('toolGroups').get('insert').tools
    let commandStates = appState.get('commandStates')
    annoTools.forEach((annoTool) => {
      let toolState = commandStates[annoTool.name] || { disabled: true }
      tools.push({
        type: 'checkbox',
        label: labelProvider.getLabel(annoTool.name),
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
    label: 'Insert',
    submenu: tools
  }
  return annotateMenu
}
