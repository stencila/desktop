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
const url = require('url')
const path = require('path')

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
    ipc.on('document:save-as', (event, newArchiveDir) => {
      this._saveAs(newArchiveDir)
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
    let isNew = getQueryStringParam('isNew')
    console.info('archiveDir', archiveDir)
    let storage = new FSStorageClient()
    let buffer = new InMemoryDarBuffer()
    let archive = new StencilaArchive(storage, buffer)
    this._archive = archive
    archive.load(archiveDir)
      .then(() => {
        // HACK: Set archive dirty from the beginning, so we get the unsaved
        // changes star (*) in the title
        if (isNew) {
          archive._makeAllResourcesDirty()
        }
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

  _saveAs(newArchiveDir) {
    console.info('saving as', newArchiveDir)
    this.state.archive.saveAs(newArchiveDir).then(() => {
      this._updateTitle(false)
      ipc.send('document:save-as:successful')
      // Update the browser url, so on reload, we get the contents from the
      // new location
      let newUrl = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        query: {
          archiveDir: newArchiveDir
        },
        slashes: true
      })
      window.history.replaceState({}, 'After Save As', newUrl);

    }).catch(err => {
      console.error(err)
    })
  }

  _archiveChanged() {
    let isDirty = this._archive.isDirty()
    if (isDirty) {
      this._updateTitle(isDirty)
    }
  }

  _updateTitle(isDirty) {
    let newTitle = this._archive.getTitle()
    if (isDirty) {
      newTitle += " *"
    }
    document.title = newTitle
  }

}
