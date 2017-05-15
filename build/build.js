// https://github.com/shelljs/shelljs
require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var webpack = require('webpack')
var config = require('../config')
var webpackMinConfig = require('./webpack.min.conf')
var webpackUnMinConfig = require('./webpack.unmin.conf')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)
shell.config.silent = true
shell.cp('-R', 'static/*', assetsPath)
shell.config.silent = false

webpack(webpackUnMinConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  webpack(webpackMinConfig, function (err2, stats2) {
    spinner.stop()
    if (err2) throw err2
    process.stdout.write(stats2.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
