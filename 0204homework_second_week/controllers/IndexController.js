class IndexController{
    constructor(){

    }
    actionIndex(){
        return async(ctx, next) => {
            ctx.body = 'hello 我是zty'
        }
    }
}

module.exports = IndexController;