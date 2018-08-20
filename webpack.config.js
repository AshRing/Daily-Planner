const path = require('path');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './js/app.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
           presets: ['env', 'stage-0']
        }
    }]
  }
}