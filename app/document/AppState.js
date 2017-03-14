const { EventEmitter } = window.substance

class AppState extends EventEmitter {
  constructor(...args) {
    super(...args)
    this._appState = {}
  }

  extend(newState) {
    Object.assign(this._appState, newState)
    this.emit('change', this._appState)
  }

  get(key) {
    return this._appState[key]
  }
}

module.exports = AppState
