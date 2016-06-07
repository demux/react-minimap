const path = require('path');


module.exports = {
  entry: './example/index.js',
  output: {
    path: path.join(__dirname, 'example'),
    filename: 'bundle.js'
  },
  devtool: '#inline-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }
  ]}
};
