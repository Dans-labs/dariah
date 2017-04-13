const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './js/app/main.jsx',
    main: './css/main.scss',
    _hrp: 'react-hot-loader/patch',
    _wpds: 'webpack-dev-server/client?http://localhost:8080',
    _who: 'webpack/hot/only-dev-server',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/../static/dist',
    publicPath: 'http://localhost:8080/static/dist',
  },
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
          {
            loader: 'eslint-loader',
            options: {
              configFile: 'eslint.yaml',
              failOnError: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
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
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: { minimize: false },
          },
          {
            loader: 'postcss-loader',
            options: { plugins: [autoprefixer] },
          },
          { loader: 'sass-loader' },
        ]),
      },
    ]
  },
  plugins: [
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
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'cheap-module-sourcemap',
  devServer: {
    hot: true,
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
};

