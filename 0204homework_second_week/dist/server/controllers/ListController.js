"use strict";

class ListController {
  constructor() {}

  actionIndex() {
    return async (ctx, next) => {
      ctx.body = 'hello 我是zty222'; // ctx.body = await ctx.render("index",{
    };
  }

}

module.exports = ListController;