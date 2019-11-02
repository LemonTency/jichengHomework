//开发环境
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
//分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { resolve,join } = require("path");

module.exports = {
  output: {
    filename: "scripts/[name].bundule.js",
    publicPath:"/"
  },
  devServer: {
    quiet: true,
    open:true,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3000"
    },
    hot: true,
    contentBase: join(__dirname, "../dist/assets"),
  },
  plugins: [
    //分析当前包的大小
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index-dev.html"
    }),
    new WebpackBuildNotifierPlugin({
      title: "中国结算 Project Webpack Build",
      logo: resolve("./favicon.png"),
      suppressSuccess: true
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ["You application is running here http://localhost:8080"],
        notes: ["请配置代理之后运行本服务"]
      },
      //提示好的工具 进行更详细的展现
      onErrors: function(severity, errors) {},
      clearConsole: true
    })
  ]
};
