const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
 
module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  context: __dirname + '/src',
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      __dirname + '/src/js/app/dux',
      __dirname + '/src/js/app/components',
      __dirname + '/src/js/lib',
      __dirname + '/src/js/test',
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ]
  },
};
