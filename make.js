/* globals __dirname */
var b = require('substance-bundler')
var exec = require('substance-bundler/extensions/exec')
var path = require('path')

function _copyAssets() {
  b.copy('./src', './app')
  b.copy('./node_modules/stencila/build', './app/lib/stencila')
}

b.task('clean', () => {
  b.rm('app')
})

b.task('postinstall', () => {
  b.exec('npm install', {
    verbose: true,
    cwd: path.join(__dirname, 'node_modules', 'stencila')
  })
})

b.task('assets', () => {
  _copyAssets()
})

b.task('cleanbuild', [ 'clean', 'assets' ])
b.task('default', [ 'assets' ])
