const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || argv.webpackEnv || "development";
console.log("🍎当前运行环境", _mode);
//动态的加载上线环境 开发环境
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const { join } = require("path");
const merge = require("webpack-merge");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { resolve } = require("path");
//判断一下当前是否是上线环境
const _modeflag = _mode === "production";
//动态插件
let _plugins = [];
//动态的规则
let _rules = [];
//动态的扩展
let _externals = {};
//非测试环境动态生成独立CSS+独立的解耦包+独立的插件机制
if (_mode !== "test") {
  _externals = {
    vue: "Vue",
    "vue-router": "VueRouter",
    vuex: "Vuex",
    axios: "axios"
  };
  _rules.push({
    test: /\.(css|postcss)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: _mode === "development"
        }
      },
      { loader: "css-loader", options: { importLoaders: 1 } },
      "postcss-loader"
    ]
  });
  _plugins.push(
    new MiniCssExtractPlugin({
      filename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      chunkFilename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      ignoreOrder: false
    })
  );
}
const webpackConfig = {
  mode: _mode == "test" ? "development" : _mode,
  entry: {
    main: "./src/main.js"
  },
  output: {
    path: join(__dirname, "./dist/assets")
    // publicPath: "/assets"
  },
  module: {
    rules: [
      ..._rules,
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              // 小于 10kB(10240字节）的内联文件
              limit: 5 * 1024,
              name: _modeflag
                ? "images/[name].[contenthash:5].[ext]"
                : "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: "commons"
        }
      }
    }
  },
  plugins: [..._plugins, new VueLoaderPlugin()],
  externals: {
    ..._externals
  },
  resolve: {
    alias: {
      "@": resolve("src")
    },
    extensions: [".js", ".vue"]
  }
};
module.exports = merge(webpackConfig, _mergeConfig);
