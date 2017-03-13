/* globals __dirname */
var b = require('substance-bundler')
var path = require('path')
var fs = require('fs')

function _copyAssets() {
  b.copy('./src', './app')
  b.copy('./node_modules/stencila/build', './app/stencila')
}

b.task('clean', () => {
  b.rm('app')
})

b.task('assets', () => {
  _copyAssets()
})

b.task('default', [ 'clean', 'assets' ])
