"use strict";

const router = require('koa-simple-router');

const IndexController = require('./IndexController');

const BookController = require('./BookController');

const indexController = new IndexController();
const bookController = new BookController();

module.exports = app => {
  app.use(router(_ => {
    _.get('/', indexController.actionIndex());
  }));
  app.use(router(_ => {
    _.get('/book/list', bookController.actionIndex());
  }));
  app.use(router(_ => {
    _.get('/book/create', bookController.actionCreate());
  }));
  app.use(router(_ => {
    _.get('/add', indexController.actionAdd());
  }));
};