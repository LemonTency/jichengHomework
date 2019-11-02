import("./index.css");
import sync from "./sync";
console.log(sync);
import(/* webpackChunkName:"async" */ "./async").then(result => {
  console.log(result);
});
const data = "第一个Webpack2";
console.log(data);
