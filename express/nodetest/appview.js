var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index',function(req,res){
    res.sendFile(__dirname + "/views/" + "index.html");
    //当我们访问index.html的时候，就将/views下面的index.html文件传送过去
})
app.post('/index',urlencodedParser,function(req,res){
    console.log(req.body.username);
    var response = {
        "first_name":req.body.username
    }
    res.redirect("https://www.baidu.com/s?wd="+req.body.username+"&rsv_spt=1&rsv_iqid=0x8f12fb7400047153&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=93380420_hao_pg&rsv_enter=1&rsv_sug3=13&rsv_sug1=12&rsv_sug7=100&rsv_t=795alq6jI%2Bst60M3okQGyxEK6VrGfSg2idrpFAxphQv2KXWVeb%2BwWWS8eVBqOECzZEyOD80x&rsv_sug2=0&inputT=3125618&rsv_sug4=3125761")
    console.log(response);
    
})
app.listen(8081,function(){
    console.log("接口已启动");
})