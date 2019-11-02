const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();

const redirect = ctx => {
  ctx.response.redirect('/about');
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const about = ctx => {
  ctx.response.body = 'About';
};
app.use(route.get('/', main));
app.use(route.get('/redirect', redirect));
app.use(route.get('/about', about));

app.use(main);
app.listen(3000);


//服务器需要重定向（redirect）访问请求。比如，用户登陆以后，将他重定向到登陆前的页面。ctx.response.redirect()方法可以发出一个302跳转，将用户导向另一个路由。
//比如上面的代码输入localhost:3000/rediect的话就会重定向到localhost:3000/about的页面，页面内容是about
