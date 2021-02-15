"use strict";

class TestController {
  constructor() {}

  actionIndex() {
    return async (ctx, next) => {
      ctx.body = 'hello 我是zty222'; // ctx.body = await ctx.render("index",{
      //     data:'jjjj'
      // })
    };
  }

}

module.exports = TestController;