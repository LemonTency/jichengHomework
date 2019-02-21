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
