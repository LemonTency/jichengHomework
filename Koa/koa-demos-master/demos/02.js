const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(main);
app.listen(3000);

//上面代码中，main函数用来设置ctx.response.body.然后使用app.use方法加载main函数。
//ctx.response就是HTTP Response
//ctx.request就是HTTP Request
//此时打开localhost:3000就能看到Hello World
