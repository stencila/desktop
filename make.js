/* globals __dirname */
var b = require('substance-bundler')

function _copyAssets() {
  b.copy('./src', './bundle')
  b.copy('./package.json', './bundle/package.json')
  b.copy('./node_modules/stencila/build', './bundle/lib/stencila')
}

b.task('clean', () => {
  b.rm('bundle')
  b.rm('dist')
})

b.task('assets', () => {
  _copyAssets()
})

b.task('default', [ 'clean', 'assets' ])
