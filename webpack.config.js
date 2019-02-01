const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Webpack = require('webpack');
const path = require('path');
const ENVIRONMENT = process.argv[process.argv.indexOf("--ENV") + 1];
const config = {
  path: {
    src: './src',
    public: './public',
  }
}

module.exports = {
  entry: `${config.path.src}/ui/app.js`,
  mode: ENVIRONMENT,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', {
            loader: 'sass-resources-loader',
              options: {
                resources: [
                  './src/ui/assets/scss/mixins.scss',
                  './src/ui/assets/scss/variables.scss',
                ],
              },
          }]
        })
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            loader: 'image-webpack-loader',
            outputPath: 'images',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 50000,
            name: './fonts/[name].[ext]',
            publicPath: '../'
          },
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    openPage: '',
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: `${config.path.src}/ui/index.ejs`,
    }),
    new ExtractTextPlugin({
      filename: 'css/styles.css',
      disable: ENVIRONMENT !== 'production',
      allChunks: true
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin(config.path.public, {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ]
}
