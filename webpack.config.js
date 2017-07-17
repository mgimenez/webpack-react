const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: ['css-loader', 'sass-loader']
        })
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
    open: true,
    openPage: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      // minify: {
      //   collapseWhitespace: true,
      // },
      // hash: true,
      template: './src/index.ejs'
    }),
    new ExtractTextPlugin({
      filename: 'css/styles.css',
      disable: false,
      allChunks: true
    })
  ]
}
