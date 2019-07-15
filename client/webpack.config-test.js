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
      __dirname + '/src/js/app/tables',
      __dirname + '/src/js/lib',
      __dirname + '/src/js/test',
      'node_modules',
    ],
  },
  //devtool: "inline-cheap-module-source-map",
  //devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-react-jsx',
              ],
              presets: [
                '@babel/preset-react',
                '@babel/preset-env',
              ],
            },
          },
        ],
      },
    ]
  },
};
