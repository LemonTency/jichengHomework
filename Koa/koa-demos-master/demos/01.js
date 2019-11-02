const Koa = require('koa');
const app = new Koa();

app.listen(3000);

//会看到not found是因为我们没有告诉 Koa 应该显示什么内容。
