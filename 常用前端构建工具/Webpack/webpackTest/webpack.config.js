        'use strict'
        const path = require('path')
        const ExtractTextPlugin = require("extract-text-webpack-plugin");
        const HtmlWebpackPlugin = require("html-webpack-plugin")
        const webpack = require("webpack")

        const extractLess = new ExtractTextPlugin({
          filename: "[name].css",
          disable: process.env.NODE_ENV === "development"
        });

        module.exports = {
          entry: {
            'index': './assets/scripts/index.es'
          },
          output: {
            path: __dirname,
            publicPath: './',
            filename: 'scripts/[name].js',
          },
          module: {
            rules: [
              {
                test: /\.es$/,
                loader: 'babel-loader',
                options:{
                  "presets": [
                    ["es2015",{
                    module:false
                  }]
                  ,"stage-0"]
                }
              },
              {
                test: /\.less$/,
                use: extractLess.extract({
                  use: [{
                      loader: "css-loader"
                  }, {
                      loader: "less-loader"
                  }],
                  // use style-loader in development
                  fallback: "style-loader"
              })
              }
            ]
          },
        plugins:[
          extractLess,
          new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress:{
              warnings: true
            },
            output: {
              comments: false
            },
            sourceMap: false
          })
        ]
        }
