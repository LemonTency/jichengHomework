//引入Events模块并创建eventEmitter对象

var events = require('events');
var eventEmitter = new events.EventEmitter();


//绑定事件处理函数
var connectHandler = function connected(){
    console.log('connected被调用！')
}
eventEmitter.on('connection',connectHandler());//传入回调函数connected，完成事件绑定

//触发事件
eventEmitter.emit('connection');//用emit方法进行触发
//所以当emit connection的时候就会触发connectionHandler函数，就会打印出'connected被调用！'

