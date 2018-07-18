const webpack = require('webpack')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './js/app/main.jsx',
    main: './css/main.css',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: __dirname + '/../static/dist',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      __dirname + '/src/js/app/dux',
      __dirname + '/src/js/app/components',
      __dirname + '/src/js/app/tables',
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
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: [
                '@babel/plugin-transform-react-jsx',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties',
              ],
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.gif?$/,
        loader: 'url-loader',
        options: {
          mimetype: 'image/png',
        },
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'url-loader',
        options: {
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
      chunkFileName: '[id].css',
    }),
    new CleanWebpackPlugin(['../static/dist'], { allowExternal: true }),
    new HtmlWebpackPlugin({
      template: __dirname + '/../client/src/html/bundle.html',
      filename: __dirname + '/../static/dist/bundle.html',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 1500000,
    maxAssetSize: 700000,
  },
};

