# React Webpack Boilerplate
[![dependencies Status](https://david-dm.org/melanieseltzer/react-webpack-boilerplate/status.svg)](https://david-dm.org/melanieseltzer/react-webpack-boilerplate) [![devDependencies Status](https://david-dm.org/melanieseltzer/react-webpack-boilerplate/dev-status.svg)](https://david-dm.org/melanieseltzer/react-webpack-boilerplate?type=dev) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/melanieseltzer/react-webpack-boilerplate/issues)

A simple starter boilerplate for React apps using Webpack 4 and Express. Ships with Pug templating by default but EJS and vanilla HTML loaders are available as well.

## :point_right: Getting Started

### Prerequisites

- [Node.js](https://nodejs.org)

### Installing

Clone repo and cd into project directory

```
git clone git@github.com:melanieseltzer/react-webpack-boilerplate.git && cd react-webpack-boilerplate
```

Install dependencies

```
npm install
```

## :rocket: Commands

Run development server on [http://localhost:8080/](http://localhost:8080/)

```
npm run dev
```

Run a production build

```
npm run build
```

## :wrench: Configurable Options

EJS and Pug are available to use as preprocessors. You will need to specify which you are using to enable live reloading of your index.

Specify which filetype to use on require statement in `src/index.js`

```
require('./index.[html|ejs|pug]')
```

Specify which filetype to use for htmlWebpackPlugin in `config/webpack.dev.js` and `config/webpack.prod.js`

```
new htmlWebpackPlugin({
  template: './src/index.[html|ejs|pug]',
  title: 'My App'
})
```

## :heart: Built With

- [Webpack](https://webpack.js.org/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
