const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  output: {
    filename: "scripts/[name].[contenthash:5].bundule.js",
    publicPath: "/assets/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "../index.html",
      template: "./src/index-prod.html",
      minify: {
        collapseWhitespace: true
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      },
      canPrint: true
    })
  ]
};
