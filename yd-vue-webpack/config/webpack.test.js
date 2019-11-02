// var nodeExternals = require('webpack-node-externals');
//externals: [nodeExternals()],
//测试环境
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const { resolve } = require("path");

module.exports = {
  output: {
    filename: "scripts/[name].bundule.js",
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.(css|postcss)$/,
        use: ["null-loader"]
      }
    ]
  },
  devtool: "inline-cheap-module-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index-dev.html"
    }),
    new WebpackBuildNotifierPlugin({
      title: "中国结算 Project Webpack Build",
      logo: resolve("./favicon.png"),
      suppressSuccess: true
    })
  ]
};
