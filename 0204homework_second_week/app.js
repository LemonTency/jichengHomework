const Koa = require('Koa');
const app = new Koa();
//process.env.NODE_ENV
//注入我们的路由
require('./controllers')(app);
console.log('服务已启动');

app.listen(3000);
