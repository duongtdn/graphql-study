
var path = require('path');

module.exports = {
  
  entry: {
		bundle: './build/index.js',		
	}, 

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },

}