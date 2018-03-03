const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const compressionPlugin = require('compression-webpack-plugin')
const brotliPlugin = require('brotli-webpack-plugin')

module.exports = env => {
  return {
    entry: {
      vendor: ['react', 'react-dom'],
      main: ['./src/index.js']
    },
    output: {
      filename: 'js/[name]-bundle.js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: "/"
    },
    devServer: {
      contentBase: 'dist',
      // Overlay errors on browser window
      overlay: true,
      // Enable hot reloading
      hot: true,
      // Colors in the terminal output
      stats: {
        colors: true
      }
    },
    module: {
      rules: [
        {
          // Transpile JavaScript files using Babel
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader"
            }
          ]
        },
        {
          // Process Sass files
          test: /\.scss$/,
          use: extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true
                }
              },
              {
                loader: 'postcss-loader'
              },
              {
                loader: 'sass-loader'
              }
            ]
          })
        },
        {
          // Process image files to the output directory
          // Include hash in the output name
          test: /\.(jpg|gif|png|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name]-[hash:8].[ext]'
              }
            }
          ]
        },
        {
          // Process HTML
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                // Target src in the attribute img
                attrs: ['img:src']
              }
            }
          ]
        },
        {
          // Process EJS
          test: /\.ejs$/,
          use: ['ejs-loader']
        },
        {
          // Process Pug
          test: /\.pug$/,
          use: ['pug-loader']
        },
        {
          // Process Handlebars
          test: /\.hbs$/,
          use: [
            {
              loader: 'handlebars-loader',
              query: {
                inlineRequires: '/img/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new extractTextPlugin('css/[name]-bundle.css'),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new htmlWebpackPlugin({
        // Template can be vanilla HTML, or preprocessors
        // EJS, Pug or Handlebars (.ejs, .pug, .hbs)
        template: './src/index.pug',
        title: 'My App'
      }),
      new uglifyJsPlugin(),
      new compressionPlugin({
        algorithm: "gzip"
      }),
      new brotliPlugin()
    ]
  }
}
