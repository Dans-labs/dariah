const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './js/app/main.jsx',
    main: './css/main.css',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/../static/dist',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      __dirname + '/src/js/app/dux',
      __dirname + '/src/js/app/components',
      __dirname + '/src/js/lib',
      'node_modules',
    ],
  },
  module: {
    rules: [
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
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              configFile: 'eslint.yaml',
              failOnError: false,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['../static/dist'], { allowExternal: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib',
      minChunks: function (module) {
        return module.context && (
          module.context.indexOf('node_modules') !== -1 ||
          module.context && module.context.indexOf('src/js/lib') !== -1
        );
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'framework',
      chunks: ['lib'],
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
  ],
};

