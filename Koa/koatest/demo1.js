        const Koa = require('koa');
        const app = new Koa();

        //logging
        app.use(async(ctx,next) => {
            await next();
            const rt = ctx.response.get('X-Response-Time');
        })

        //x-response-time
        app.use(async (ctx,next) => {
            const start = Date.now();
            await next();
            const ms = Date.now()-start;
            ctx.set('X-Response-Time',`${ms}ms`);
        })
        
        //response
        app.use(async ctx => {
            ctx.body = "Hello world"
        })

        app.listen(3000);