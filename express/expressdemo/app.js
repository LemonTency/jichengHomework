var express = require('express');

var app = express();
//引入静态文件
app.use(express.static('public'));
//配合swig模板
var swig = require('swig');
app.set('view engine','html');
app.engine('html',swig.renderFile);
app.get('/',function(req,res,next){
    res.json({
        result: 'zty520'
    })
})
app.get('*',function(req,res,next){
    //status就是将状态设置404，network可见
    res.status(404);
    res.end('404');
})
app.listen(8088,function(){
    console.log('Server is start')
})
