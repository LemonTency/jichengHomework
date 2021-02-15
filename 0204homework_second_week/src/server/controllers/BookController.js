"use strict";

class BookController {
  constructor() { }

  actionIndex() {
    return async (ctx, next) => {
      ctx.body = 'hello 我是zty222'; // ctx.body = await ctx.render("index",{
    };
  }

  actionCreate() {
    //SSR 
    return async (ctx, next) => {
      ctx.body = await ctx.render("book/page/book-create");
    };
  }

}

module.exports = BookController;