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
  			test: /\.css$/,
  			loader: 'style-loader!css-loader'
  		}
  	]
  }
};
