const Koa = require('Koa');
const app = new Koa();

const main = (ctx,next) => {
    ctx.body = 'hello world';
    console.log(ctx.request.path);
}

app.use(main);

app.listen(3000);
