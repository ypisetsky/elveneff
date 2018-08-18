const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: "./src/main.js",
   mode: "development",
   module: {
     rules: [
       {
         test: /\.(js|jsx)$/,
         exclude: /(node_modules|bower_components)/,
         loader: 'babel-loader',
         options: { presets: ['env'] }
       },
       {
         test: /\.css$/,
         use: [ 'style-loader', 'css-loader' ]
       },
       {
         test: /\.png$/,
         use: ['file-loader'],
       }
     ],
   },

  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
    publicPath: "http://localhost:3000/",
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Elvenar Calculator",
      template: "src/indextemplate.html",
    }),
  ]
}
