/* globals __dirname */
var b = require('substance-bundler')

function _copyAssets() {
  b.copy('./src', './app')
  b.copy('./node_modules/stencila/build', './app/lib/stencila')
}

b.task('clean', () => {
  b.rm('app')
})

b.task('assets', () => {
  _copyAssets()
})

b.task('default', [ 'clean', 'assets' ])
