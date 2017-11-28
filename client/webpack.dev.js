const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('main.css')

module.exports = merge(common, {
  entry: {
    _hrp: 'react-hot-loader/patch',
    _wpds: 'webpack-dev-server/client?http://localhost:8080',
    _who: 'webpack/hot/only-dev-server',
  },
  output: {
    publicPath: 'http://localhost:8080/static/dist',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract([
          {
            loader: 'css-loader',
            options: { minimize: false },
          },
          {
            loader: 'postcss-loader',
            options: { plugins: [autoprefixer] },
          },
        ]),
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    extractCSS,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    //hot: true, // currently, if this is present, browser will not refresh!
    publicPath: '/static/dist/',
    proxy: {
      '/static/': 'http://localhost:8001',
      '/favicons': 'http://localhost:8001',
      '/api': 'http://localhost:8001',
      '/login': 'http://localhost:8001',
      '/logout': 'http://localhost:8001',
      '/slogout': 'http://localhost:8001',
    },
    historyApiFallback: {
      disableDotRule: true,
    }
  },
});

