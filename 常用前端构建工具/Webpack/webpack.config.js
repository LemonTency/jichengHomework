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
        //加载器配置
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


        entry:{
            index:'./src/main.js'
        }
        entry:['./src/main.js','/src/index.js']


        module:{
            loader:[
                {test:/\.css$/,loader:'style-loader!css-loader'},
                {test:/\.scss$/,loader:'style!css!sass?sourceMap'},
                {test:/\.{png!jpg}$/,loader:'url-loader?limit=8192'}
            ]
        }

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


        {
            resolve:{
                alias:{
                    moment:"moment/min/hhh.js"
                }
            }
        }
        require("moment");


        {
            module:{
                noParse:[/moment-with-noscale/]
            }
        }

        //将模块暴露到全局
        //通过module.loader
        {
            module:{
                loaders:{
                    test:/jQuery\.js$/,
                    loader:"expose?$!expose?jQuery"
                }
            }
        }
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

//公共代码库
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                   // async: true,
                   filename:'[name].[hash:8].js',
                  //对main和main1的文件单独打包，main的chunks集合包含了两个文件，也就是require.ensure后的两个文件
                   name:      ['main','main1'], // Move dependencies to our main file
                   minChunks: 2, // How many times a dependency must come up before being extracted
                   chunks: ['jquery','underscore'] //就打包jquery和underscore这两个库

                }),
   
       ],


       //单独打包CSS
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
