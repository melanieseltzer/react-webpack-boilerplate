import express from 'express'
const server = express()
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'
if (!isProd) {
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
}

// Serve from the dist folder
// with gzip compression
const expressStaticGzip = require('express-static-gzip')
server.use(
  expressStaticGzip('dist', {
    enableBrotli: true
  })
)

// Port set by Heroku dynamically
// Or use 8080 in dev
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
