const pluginName = 'AfterHtmlPlugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');

function createHtml(type, array) {
  let result = ''
  if (type === 'js') {
    array.forEach((item) => { result += `<script src="${item}"></script>` })
  }
  if (type === 'css') {
    array.forEach((item) => { result += `<link href="${item}" rel="stylesheet"></link>` })
  }
  return result
}
class AfterHtmlPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      // Static Plugin interface |compilation |HOOK NAME | register listener 
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        'MyPlugin', // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          this.jsArray = data.assets.js
          this.cssArray = data.assets.css
          // Tell webpack to move on
          cb(null, data)
        }
      )

      // Static Plugin interface |compilation |HOOK NAME | register listener 
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'MyPlugin', // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          const scriptString = createHtml("js", this.jsArray)
          const linkString = createHtml("css", this.cssArray)
          // Manipulate the content
          data.html = data.html.replace('<!-- injectjs -->', scriptString)
          data.html = data.html.replace('<!-- injectcss -->', linkString)
          // Tell webpack to move on
          cb(null, data)
        }
      )
    })
  }
}

module.exports = AfterHtmlPlugin;

