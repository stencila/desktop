const {
  getQueryStringParam, Component,
  InMemoryDarBuffer, substanceGlobals,
  platform
} = window.substance

const { JATSImportDialog } = window.texture

const {
  Project,
  setupStencilaContext,
  StencilaArchive
} = window.stencila

const ipc = require('electron').ipcRenderer
const darServer = require('dar-server')
const { FSStorageClient } = darServer

window.addEventListener('load', () => {
  substanceGlobals.DEBUG_RENDERING = platform.devtools
  App.mount({}, window.document.body)
})

class App extends Component {

  didMount() {
    this._init()
    this._archive.on('archive:changed', this._archiveChanged, this)
    ipc.on('document:save', () => {
      this._save()
    })
  }

  dispose() {
    // TODO: is it necessary to do ipc.off?
    // (App component is never unmounted, only the full window is killed)
  }

  getInitialState() {
    return {
      archive: undefined,
      error: undefined
    }
  }

  render($$) {
    let el = $$('div').addClass('sc-app')
    let { archive, host, functionManager, engine, error } = this.state

    if (archive) {
      el.append(
        $$(Project, {
          documentArchive: archive,
          host,
          functionManager,
          engine
        })
      )
    } else if (error) {
      if (error.type === 'jats-import-error') {
        el.append(
          $$(JATSImportDialog, { errors: error.detail })
        )
      } else {
        el.append(
          'ERROR:',
          error.message
        )
      }
    } else {
      // LOADING...
    }
    return el
  }

  _init() {
    let archiveDir = getQueryStringParam('archiveDir')
    let storage = new FSStorageClient()
    let buffer = new InMemoryDarBuffer()
    let archive = new StencilaArchive(storage, buffer)
    this._archive = archive
    archive.load(archiveDir)
      .then(() => {
        this._updateTitle()
        return setupStencilaContext(archive)
      }).then(({host, functionManager, engine}) => {
        this.setState({archive, functionManager, engine, host})
      })
      .catch(error => {
        console.error(error)
        this.setState({error})
      })
  }

  /*
    We may want an explicit save button, that can be configured on app level,
    but passed down to editor toolbars.
  */
  _save() {
    this.state.archive.save().then(() => {
      this._updateTitle(false)
    }).catch(err => {
      console.error(err)
    })
  }

  _archiveChanged() {
    let pendingChanges = this._archive.hasPendingChanges()
    if (pendingChanges) {
      this._updateTitle(pendingChanges)
    }
  }

  _updateTitle(pendingChanges) {
    let newTitle = this._archive.getTitle()
    if (pendingChanges) {
      newTitle += " *"
    }
    document.title = newTitle
  }

}
