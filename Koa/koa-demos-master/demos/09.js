const Koa = require('koa');
const app = new Koa();

const one = (ctx, next) => {
  console.log('>> one');
  next();
  console.log('<< one');
}

const two = (ctx, next) => {
  console.log('>> two');
  next();
  console.log('<< two');
}

const three = (ctx, next) => {
  console.log('>> three');
  next();
  console.log('<< three');
}

app.use(one);
app.use(two);
app.use(three);

app.listen(3000);




//多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。
//1. 最外层的中间件首先执行。
//2. 调用next函数，把执行权交给下一个中间件。
//3. ...
//4. 最内层的中间件最后执行。
//5. 执行结束后，把执行权交回上一层的中间件。
//6. ...
//7.最外层的中间件收回执行权之后，执行next函数后面的代码
//下面是输出结果
//>>one
//>>two
//>>three
//<<three
//<<two
//<<one
