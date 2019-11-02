//中间件
var express = require('express');
var app = express();
//中间件设置静态文件夹
app.use(function(req,res,next){
    console.log('必经路由');
    next();
});
 
app.get('/', function (req, res) {
   res.send('Hello World');
})
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})