import express from 'express'
const server = express()
import path from 'path'

const webpack = require('webpack')
const config = require('../../config/webpack.dev.js')
// Create and return a compiler
const compiler = webpack(config)

// Use the compiler with the middleware
// Pull the package and envoke the function
// Takes two args - compiler and devServer portion of config
const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
)

// Add hot reloading to the server
const webpackHotMiddleware = require('webpack-hot-middleware')(
  compiler,
  config.devServer
)

// Tell Express to use the middleware
server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)

// Serve from the dist folder
const staticMiddleware = express.static('dist')
server.use(staticMiddleware)

// Listen on port 8080
// Run this function after server has started
server.listen(8080, () => {
  console.log('Server is listening!')
})
