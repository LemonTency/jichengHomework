const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  if (ctx.request.path !== '/') {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
  } else {
    ctx.response.body = 'Hello World';
  }
};

app.use(main);
app.listen(3000);


//如果是输入localhost:3000就会看到Hello World
//如果是输入localhost:3000/xx等其他路径的话就会看到可以看到一个链接，点击后就跳到首页


// const Koa = require('koa');
// const app = new Koa();

// const main = ctx => {
//   if(ctx.request.path !== '/'){
//     ctx.response.type = 'html';
//     ctx.response.body = '<a>hhhhhhh</a>'
//   }else {
//     ctx.response.body = "hello world";
//   }
// };

// app.use(main);
// app.listen(3000);