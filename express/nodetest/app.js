var express = require('express');
var app = express();
 
// app.get('/', function (req, res) {
//   res.send('Hello World');
//   console.log(req.query); 
// })
app.get('/index/:id', function (req, res) {
  //res.send('Hello World');
  //res.send(req.params.id);
  res.json({
    id:'res.params.id'
  })
}) 
var server = app.listen(8081, function () {
  console.log("应用实例")
})

//1.安装并引入express并启用一个express的实例
//2.app.listen一个端口，启动一个后台服务
//3.app.get设置基本的路由，然后吐出数据
//4.平时的请求都是get 在浏览器里面敲
//5.get post put delete
