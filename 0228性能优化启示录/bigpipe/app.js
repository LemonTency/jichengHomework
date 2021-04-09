const Koa = require('koa');
const fs = require('fs')
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

const task1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(`<script>addHTML('part1','第一部分加载完毕<br/>')</script>`)
    }, 2000)
  })
}

const task2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(`<script>addHTML('part2','第二部分加载完毕<br/>')</script>`)
    }, 2000)
  })
}
router.get('/', async (ctx, next) => {
  // ctx.router available
  const file = fs.readFileSync("index.html", "utf-8")
  ctx.status = 200
  ctx.type = "html"
  ctx.res.write(file)
  const result = await task1()
  ctx.res.write(result)
  const result2 = await task2()
  ctx.res.write(result2)
  ctx.res.end()
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen('8090')