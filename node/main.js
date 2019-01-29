//-----调用模块的文件
//调用Hello模块
var Hello = require('./hello');

hello = new Hello();
hello.setName('zty');
hello.sayHello();