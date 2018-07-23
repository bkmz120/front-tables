const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');


module.exports = {
  entry: './app/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Common: path.resolve(__dirname, 'app/common/'),
      Pages: path.resolve(__dirname, 'app/pages/'),
      Store: path.resolve(__dirname,'app/store/'),
      Actions: path.resolve(__dirname,'app/actions/'),
      Constants: path.resolve(__dirname,'app/constants/'),
    }
  },
  output: {
    path: __dirname + '/app/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  watch: true,
  plugins: [
    new ExtractTextPlugin("styles.css"),
    // new UglifyJSPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    })
  ]
};