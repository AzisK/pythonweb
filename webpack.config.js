const path = require('path');

module.exports = {
  entry: ['babel-regenerator-runtime', './static/js/app.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/js')
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  }
}