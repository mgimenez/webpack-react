const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Webpack = require('webpack');

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    openPage: '',
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      // minify: {
      //   collapseWhitespace: true,
      // },
      hash: true,
      template: './src/index.ejs'
    }),
    new ExtractTextPlugin({
      filename: 'css/styles.css',
      disable: true,
      allChunks: true
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
  ]
}
