const { EventEmitter } = window.substance

class AppState extends EventEmitter {
  constructor(...args) {
    super(...args)
  }

  set(key, value) {
    this._state[key] = value
    this.emit(key, value)
  }

  get(key) {
    return this._state[key]
  }
}

module.exports = AppState
