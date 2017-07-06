/* globals __dirname */
var b = require('substance-bundler')

function _copyAssets() {
  b.copy('./src', './app')
  b.copy('./package.json', './app/package.json')
  b.copy('./node_modules/stencila/build', './app/lib/stencila')
}

b.task('clean', () => {
  b.rm('app')
})

b.task('assets', () => {
  _copyAssets()
})

b.task('cleanbuild', [ 'clean', 'assets' ])
b.task('default', [ 'assets' ])
