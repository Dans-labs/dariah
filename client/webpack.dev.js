const merge = require('webpack-merge');
const common = require('./webpack.prod.js');

const webpack = require('webpack')

module.exports = merge(common, {
  entry: {
    _hrp: 'react-hot-loader/patch',
    _wpds: 'webpack-dev-server/client?http://localhost:8080',
    _who: 'webpack/hot/only-dev-server',
  },
  output: {
    filename: '[name].js',
    publicPath: 'http://localhost:8080/static/dist/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              //configFile: 'eslint.yaml',
            },
          }
        ],
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({ options: {} }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/static/dist/',
    proxy: {
      '/': 'http://localhost:8001',
      '/static/': 'http://localhost:8001',
      '/favicons': 'http://localhost:8001',
      '/api': 'http://localhost:8001',
      '/login': 'http://localhost:8001',
      '/logout': 'http://localhost:8001',
      '/slogout': 'http://localhost:8001',
    },
    historyApiFallback: {
      index: '/',
      disableDotRule: true,
    }
  },
  performance: false,
});

