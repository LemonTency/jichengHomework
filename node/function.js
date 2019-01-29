// function say(word){
//     console.log(word);
// }

// function execute(someFunction, value){
//     someFunction(value);
// }

// execute(say,'hello');//hello

//---------匿名函数进行传递
// function execute(someFunction,value){
//     someFunction(value);
// }

// execute(function(word){console.log(word)},'hello')
//hello

//-----http
var http = require('http');
http.createServer(function(request,response){
    response.writeHead(200,{'Content-type':'text/plain'});
    response.write('hello world zty');
    response.end();
}).listen(8000);