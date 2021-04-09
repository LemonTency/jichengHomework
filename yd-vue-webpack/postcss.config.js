const postcssCustomProperties = require("postcss-custom-properties");
const cssvariables = require('postcss-css-variables');
const postcssPresetEnv = require("postcss-preset-env");
module.exports = {
  plugins: [
    postcssPresetEnv({
      browsers: "last 2 versions",
      stage: 0,
      features: {
        "nesting-rules": true,
        "custom-properties":false
      }
    }),
    //如果将来兼容更多的浏览器 
    //cssvariables()
    //主推Chrome preserve决定留不留root变量
    postcssCustomProperties({
      preserve: true
    }),
  ]
};
