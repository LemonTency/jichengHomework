//---------模块文件
//模块的主要逻辑
function Hello(){
    var name;
    this.setName = function(argName){
        name = argName;
    };
    this.sayHello = function(){
        console.log('hello'+name)
    };
};
//将模块导出
module.exports = Hello;