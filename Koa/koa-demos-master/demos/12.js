const Koa = require('koa');
const app = new Koa();
const path = require('path');
const serve = require('koa-static');

const main = serve(path.join(__dirname));

app.use(main);
app.listen(3000);

//访问 http://127.0.0.1:3000/12.js，在浏览器里就可以看到这个脚本的内容。