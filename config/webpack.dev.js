const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    main: [
      'babel-runtime/regenerator',
      'react-hot-loader/patch',
      'babel-register',
      'webpack-hot-middleware/client?reload=true',
      './src/index.js'
    ]
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]-bundle.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          minChunks: 2
        }
      }
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
            loader: 'babel-loader'
          }
        ]
      },
      {
        // Process Sass files
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        // Process image files to the output directory
        // Include hash in the output name
        test: /\.(jpg|gif|png)$/,
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
            loader: 'html-loader'
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
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new htmlWebpackPlugin({
      // Template can be vanilla HTML, or preprocessors
      // EJS or Pug
      template: './src/index.pug',
      inject: true,
      title: 'My App'
    })
  ]
}