const Koa = require('koa');
const app = new Koa();

const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}

const main = ctx => {
  ctx.response.body = 'Hello World';
};


app.use(logger);
app.use(main);
app.listen(3000);


//先执行logger这个中间件，命令行会输出1549179377510 GET /
//遇到next之后就会将执行权转交给下一个中间件main，所以会输出Hello World
//如果logger中间件没有next()，那么就不会执行main，页面就不会输出Hello World
//执行顺序跟注册的顺序有关

