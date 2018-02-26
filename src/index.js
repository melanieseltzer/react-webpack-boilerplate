require('babel-runtime/regenerator')
// Sent down to client, accept and reload component maintaining state
require('react-hot-loader/patch')
require('babel-register')
// Set up the web socket connection with hot reloading
require('webpack-hot-middleware/client?reload=true')
require('./styles/main.scss')
// Specify correct index extension depending if using preprocessor
// .ejs, .pug, .hbs or vanilla .html
require('./index.pug')
require('./app')
