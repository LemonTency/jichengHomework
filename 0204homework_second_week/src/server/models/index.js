"use strict";

/**
 * @fileoverview 实现index的数据模型
 * @author zty
 */
const SafeRequest = require('../utils/SafeRequest.js');
/**
 * Index类 获取后台关于图书相关的数据类
 * class
 */


class Index {
  /**
   * @constructor 
   * @param{string} app 参数是字符串，是Koa执行上下文
   */
  constructor(app) {}
  /**
   * 获取后台全部图书的数据方法
   * @param{*} option 配置项
   * @example
   * return new Promise
   * getData(options)
   */


  getData(options) {
    const safeRequest = new SafeRequest("library");
    return safeRequest.fetch({});
  }

}

module.exports = Index;