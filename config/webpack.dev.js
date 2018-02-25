const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: ['./src/index.js']
  },
  output: {
    filename: 'js/[name]-bundle.js',
    path: path.resolve(__dirname, '../dist')
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
  devtool: 'source-map',
  module: {
    rules: [
      {
        // Transpile JavaScript files using Babel
        // Exclude node_modules folder
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        // Process CSS files
        // First lint the file (css-loader)
        // Then inject CSS into the HTML (style-loader)
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new htmlWebpackPlugin({
      // Template can be vanilla HTML, or preprocessors
      // EJS, Pug or Handlebars (.ejs, .pug, .hbs)
      template: './src/index.pug',
      title: 'My App'
    })
  ]
}
