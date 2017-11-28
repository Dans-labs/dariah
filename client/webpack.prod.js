const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('main.css')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const isProd = process.env.NODE_ENV == 'production'

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract([
          {
            loader: 'css-loader',
            options: { minimize: true },
          },
          {
            loader: 'postcss-loader',
            options: { plugins: [autoprefixer] },
          },
        ]),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    extractCSS,
    new UglifyJSPlugin(),
  ],
});

