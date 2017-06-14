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
      __dirname + '/src/js/app/pure',
      __dirname + '/src/js/app/state',
      __dirname + '/src/js/app/object',
      __dirname + '/src/js/lib',
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
