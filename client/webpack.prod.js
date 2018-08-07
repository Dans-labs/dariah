const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/../client/src/html/bundle.html',
      filename: __dirname + '/../static/dist/bundle.html',
    }),
  ],
})
