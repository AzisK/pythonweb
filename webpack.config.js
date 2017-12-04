const path = require('path');

module.exports = {
  entry: './templates/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'templates/js')
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
  			loader: 'babel',
  			exclude: /node_modules$/,
  			query: {
  				presets: ['es2015']
  			}
  		}
  	]
  }
};
