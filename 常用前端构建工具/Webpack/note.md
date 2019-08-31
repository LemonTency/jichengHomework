最近在学习webpack，接触到的第一个插件就是html-webpack-plugin,那么今天就来详解一下它的用法吧。

html-webpack-plguin
https://www.npmjs.com/package/html-webpack-plugin
https://segmentfault.com/a/1190000013883242

一、webpack1中的webpack.config

webpack.base.conf.js中进行配置。
entry: 配置入口资源
可以是一个文件或者多个入口文件，可以是对象格式或者数组格式。

        entry:{
            index:'./src/main.js'
        }
        entry:['./src/main.js','/src/index.js']

output: 配置编译后的资源，主要包括`path`,`filename`和`publishPath`属性。`path`代表输出的路径，`filename`代表输出的文件名称，`publishPath`代表静态资源发布后的前缀地址。
module: 资源处理,[module.loaders](http://webpack.github.io/docs/using-loaders.html) 是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理。[点击这里可以查看loader list](http://webpack.github.io/docs/list-of-loaders.html)。

        module: {
            //加载器配置
            loaders: [
                //.css 文件使用 style-loader 和 css-loader 来处理
                { test: /\.css$/, loader: 'style-loader!css-loader' },
                //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
                { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
                //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
                { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
            ]
        }
1、在页面里面引用资源使用
require("url-loader?mimetype=image/png!./file.png");

2、在webpack.config.js文件夹中使用
{ test: /.png$/, loader: "url?mimetype=image/png" };

3、在命令行中编译使用
webpack --module-bind "png=url-loader?mimetype=image/png";

如上，"-loader"其实是可以省略不写的，多个loader之间用“!”连接起来。
注意所有的加载器都需要通过 npm 来加载，并建议查阅它们对应的 readme 来看看如何使用。
拿最后一个 url-loader 来说，它会将样式中引用到的图片转为模块来处理，使用该加载器需要先进行安装：
npm install url-loader -save-dev
配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式（其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）。也可以使用file-loader来加载资源文件。

resolve: 配置资源别名/扩展名

resolve
最后是 resolve 配置，这块很好理解，直接写注释了：

    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js'],
        //别名
        alias: {
            filter: path.join(__dirname, 'src/filters')
        }
    }
plugins: 插件，比loader强大

下面看一个简单的示例：

        var webpack = require('webpack');

        module.exports = {
            //插件项
            plugins: [
                //提公用js到common.js文件中
                new webpack.optimize.CommonsChunkPlugin('common.js'),
                //将样式统一发布到style.css中
                new ExtractTextPlugin("style.css", {
                    allChunks: true,
                    disable: false
                }),
                //使用ProvidePlugin加载使用频率高的模块
                new webpack.ProvidePlugin({
                    $: "webpack-zepto"
                })
            ],
            //页面入口文件配置
            entry: {
                index : './src/main.js'
            },
            //入口文件输出配置
            output: {
                path: __dirname +'/dist/',
                filename: '[name].js'
            },
            module: {
                //加载器配置，test是正则 !代表两个loader都要加载
                loaders: [
                    { test: /\.css$/, loader: 'style-loader!css-loader' },
                    { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
                    { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
                ]
            },
            //其它解决方案配置
            resolve: {
                extensions: ['', '.js', '.json', '.scss'],
                alias: {
                    filter: path.join(__dirname, 'src/filters')
                }
            }
        };
直接在页面引入 webpack 最终生成的页面脚本和样式文件即可。
**常见loader**
样式：css-loader,sass-loader,less-loader
脚本：babel-loader
图片/字体：file-loader url-loader
二、WebPack使用优化
1. 使用别名

        {
            resolve:{
                alias:{
                    moment:"moment/min/hhh.js"
                }
            }
        }
        require("moment");

2. 忽略对已知模块的解析。

        {
            module:{
                noParse:[/moment-with-noscale/]
            }
        }
3. 将模块暴露到全局
通过module

        {
            module:{
                loaders:{
                    test:/jQuery\.js$/,
                    //？后面是参数
                    loader:"expose?$!expose?jQuery"
                }
            }
        }

    通过plugins

        //通过plugins
        {
            plugins:{
                new webpack.ProvidePlugin({
                    $:"jquery",
                    jQuery:"jquery",
                    "window.jQuery":"jquery"
                })
            }
        }

        //in a module
        $("#utem")//可以正常工作

4. 有时如果每个文件都需要用到同一段代码，如果在每一个打包后的文件里面都存在的话文件体积就很大了，我们可以把很多文件的公共部分提取出来。
使用CommonsChunkPlugin这个插件。
https://blog.csdn.net/liangklfang/article/details/55224360

        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                   // async: true,
                   filename:'[name].[hash:8].js',
                  //对main和main1的文件单独打包，main的chunks集合包含了两个文件，也就是require.ensure后的两个文件
                   name:      ['main','main1'], // Move dependencies to our main file
                   minChunks: 2, // How many times a dependency must come up before being extracted
                   chunks: ['jquery','underscore'] //就打包jquery和underscore这两个库
                   
                }),
           ]
5. 单独打包CSS
extract-text-webpack-plugin
https://www.npmjs.com/package/extract-text-webpack-plugin

       const ExtractTextPlugin = require("extract-text-webpack-plugin");
 
        module.exports = {
        module: {
            rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
                })
            }
            ]
        },
        plugins: [
            new ExtractTextPlugin("styles.css"),
        ]
        }

6. Webpack2新变化
代码压缩：
在config文件中的plugins

        plugins: [
          // http://vuejs.github.io/vue-loader/workflow/production.html
          new webpack.DefinePlugin({
            'process.env': env
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          }),
同时也可以配置一些文件可以压缩一些文件不压缩。

三、Webpack2&3核心技巧

现在，我们就将我们上面说的知识点都一一回顾一下吧！来进行实操吧！
1. 新建一个文件夹叫webpackTest
2. 文件夹里面新建webpack.config.js和package.json，然后npm init
3. 使用npm安装webpack
4. 新建了index.es（es6文件）和index.less，使用webpack来进行构建
5. 同时在index.html里面引入刚刚输出的index.js和index.css（当前文件目录如下）


    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Webpack</title>
        <link rel="stylesheet" href="./styles/index.css" />
      </head>
      <body>
        <h1>hello webpack</h1>
        <script type="text/javascript" src="./scripts/index.bundle.js"></script>
      </body>
    </html>

![image.png](https://upload-images.jianshu.io/upload_images/7728915-4bc7a76182182188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
6. 接下来就是万众瞩目的webpack.config.js的配置啦！
entry和output分别代表入口资源和output代表编译后的资源。

        entry: {
            index: './assets/scripts/index.es'
        },
        output: {
          path: path.join(__dirname,'./assets/'),
          publicPath: './',
          filename: 'scripts/[name].js',
        },
    然后在module配置不同文件的编译loader
[https://www.webpackjs.com/loaders/less-loader/](https://www.webpackjs.com/loaders/less-loader/)
**在这里，关于less-loader的使用，有地方是需要特别注意的：**

        {
          //配置编译less文件的规则
          //i表示不区分大小写
          //如果直接使用less-loader的话，css会打到js文件里面去
          test: /\.less$/i,
          use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "less-loader"
        }]
        }
    如果直接这样去配置编译的话也是没有问题的，但是这样子我们的样式表文件会一起打包在js文件里面，打印出来之后只有一个index.bundle.js的文件，如果我们想要js文件和css文件分开来要怎么处理呢？
这个时候就需要[ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)这个插件了。

    具体使用：

        const ExtractTextPlugin = require("extract-text-webpack-plugin");
        const extractLess = new ExtractTextPlugin({
          filename: "[name].css",
          disable: process.env.NODE_ENV === "development"
        });

        module.exports = {
             ...
            module: {
              rules: [{
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
              }]
          },
          plugins: [
              extractLess
          ]
        };

    但是在执行webpack打包的时候却报错了
 Chunk.entrypoints: Use Chunks.addGroup instead
如果出现了这个问题，说明装的webpack一定是4.0版本的，看了一下package.json，webpack确实是4.0版本以上的。在这里的话我直接安装了webpack的3.6.0版本，就可以顺利打包了。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-f49a1df252d67b37.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这个时候就可以看到打包出来的index.bundle.js文件和index.css文件啦！
7. 以为这样就结束了吗？？并不是的，接下来要装大家都很熟悉的html-webpack-plguin了。为什么要使用它呢？因为像我们第5步那样手动引入这样的文件太傻了，而且如果是将生成的css,js文件后面加上哈希值（解决缓存问题），我们预先在html中就无法引入了。**html-webpack-plugin可以根据指定的源模板文件来生成编译后的html文件，同时还可以加入hash等解决缓存的问题。**
[https://www.jianshu.com/p/0eb9487cf765](https://www.jianshu.com/p/0eb9487cf765)
所以，现在把我们的index.html删掉，在webpack.config.js中进行配置。建立一个没有引用其他js文件和css文件的index.html。
在plugin项中进行配置：

        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './index.html',
          inject: true
        })


在这里遇到了一个问题
![image.png](https://upload-images.jianshu.io/upload_images/7728915-e07b3af366458e25.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    所以是需要一个index.html

8. 关于代码压缩和删除无用代码

    代码压缩，使用webpack自带的压缩工具就行了

          new webpack.optimize.UglifyJsPlugin({
            compress:{
              warnings: true
            },
            output: {
              comments: false
            },
            sourceMap: false
          })
    记住进行代码压缩的同时，要将es2015的module给关了，才会删除掉没有用的函数
9. 此时我们的webpack.config.js是这样子的

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
10. webpack3的code splitting也是很好玩的，下次再研究研究
