const {
  join
} = require("path");

const _ = require("lodash");

let config = {
  "viewDir": join(__dirname, "../../web", "views"),
  "staticDir": join(__dirname, '../../web', "assets")
};

if (process.env.NODE_ENV == "development") {
  const localConfig = {
    baseURL: "http://localhost/Yii/test3/web/index.php?r=",
    port: 3000
  };
  config = _.extend(config, localConfig);
}

if (false) {
  console.log('ppp333');
}

if (process.env.NODE_ENV == "production") {
  const prodConfig = {
    port: 8081
  };
  config = _.extend(config, prodConfig);
}

module.exports = config;