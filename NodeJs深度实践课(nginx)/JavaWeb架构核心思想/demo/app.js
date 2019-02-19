/*一起回家项目启动文件*/
var restify = require('restify');
var gohomeController = require('./Controller/gohomeController');

var server = restify.createServer({
    name:'togetherHome'
});

var gohome = new gohomeController;
gohome.init();
server.listen(3000,function(){
    console.log('项目已启动')
})