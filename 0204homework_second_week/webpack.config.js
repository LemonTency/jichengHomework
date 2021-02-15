const { join, resolve } = require('path');
const config = require(`./config/webpack.${process.env.NODE_ENV}`)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AfterHtmlPlugin = require('./config/AfterHtmlPlugin.js')
const devMode = process.env.NODE_ENV !== 'production'
const glob = require('glob')
const { merge } = require('webpack-merge')

//读到对应的入口文件
const files = glob.sync('./src/web/views/**/*.entry.js')

let entrys = {}
const htmlPlugin = []

files.forEach((url) => {
  if (/([a-zA-Z]+-[a-zA-Z]+)\.entry\.js$/.test(url)) {
    const entryKey = RegExp.$1
    const [pageName, actionName] = entryKey.split("-")
    entrys[entryKey] = `./src/web/views/${pageName}/${pageName}-${actionName}.entry.js`
    htmlPlugin.push(new HtmlWebpackPlugin({
      inject: false,
      template: `./src/web/views/${pageName}/page/${entryKey}.html`,
      filename: `../views/${pageName}/page/${entryKey}.html`,
      chunks: ["runtime", entryKey]
    }))
  }
})

//公共选项配置区域
let cssLoaders = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
    },
  },
  {
    loader: 'postcss-loader',
  },
];

const commonConfig = {
  entry: entrys,
  // entry: './src/web/index.tsx',
  output: {
    path: join(__dirname, './dist/web/assets'),
    filename: '[name].[hash].js'
  },
  // output: {
  //   path: join(__dirname, './dist/assets'),
  // },
  externals: {
    // react: 'React',
    // 'react-router-dom': 'ReactRouterDOM',
    // "mobx-react-lite": "mobx-react-lite"
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', 'jsx'],
    modules: ['node_modules', resolve('src')],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
        type: 'asset',
      },
    ]
  },
  plugins: [...htmlPlugin,
  // new ProgressBarPlugin(),
  // new HtmlWebpackPlugin({
  //   filename: 'index.html',
  //   template: `src/web/index-dev.html`
  // }),
  new MiniCssExtractPlugin(
    {
      filename: devMode ? 'styles/[name].css' : 'styles/[name].[hash].css',
      chunkFilename: devMode ? 'styles/[id].css' : 'styles/[id].[hash].css',
    }
  ),
  new CopyPlugin({
    patterns: [{
      from: join(__dirname, './src/web/components'), to: join(__dirname, './dist/web/components')
    }, {
      from: join(__dirname, './src/web/views/layout.html'), to: join(__dirname, './dist/web/views/layout.html')
    }]
  }),
  new AfterHtmlPlugin()
  ],
  experiments: {
    asset: true,
  },
}
module.exports = merge(commonConfig, config)