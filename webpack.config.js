var path = require('path');
var webpack = require('webpack');

var config = {
  entry: {
    'cross-talk': './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js',
    library: 'CrossTalk',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NormalModuleReplacementPlugin(/babel-runtime\/core-js\/promise/, 'bluebird')
  ],

  devtool: 'inline-source-map'
};

if (process.env.NODE_ENV === 'production') {
  config.devtool = 'nosources-source-map';
}

module.exports = config;
