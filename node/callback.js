//------阻塞式代码
// var fs = require('fs');

// var data = fs.readFileSync('data.txt');

// console.log(data);

// console.log(data.toString());

// 对data没有操作直接输出的话输出的data是十六进制的。
// 输出的是<Buffer 68 68 68 68 68 68 68>
// 但是用toString就会转化为字符串
// 输出的是我们在data里面写的hhhhhhh


//------非阻塞代码

var fs = require('fs');

fs.readFile('data.txt',function(err,data){
    if(err){
        return console.error(err);
    }
    console.log(data.toString());

})

console.log('程序执行完毕');
