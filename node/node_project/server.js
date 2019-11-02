var http = require("http");
var url = require("url");

function start(route,handle){
    function onRequest(request,response){
        console.log("Request Start");
        var postData = '';
        var pathname = url.parse(request.url).pathname;
        console.log("Resquest for "+pathname+"is ready");
        //有data事件（表示新的小数据块到达了）以及end事件（表示所有的数据都已经接收完毕）。
        //当这些事件被触发的时候，执行相对应的回调函数
        //首先，设置接收数据request的编码格式为utf-8
        request.setEncoding("utf8");
        //用于收集每次接收到的新数据块，并将其赋值给postData 变量
        request.addListener("data",function(postDataChunk){
            postData += postDataChunk;
            console.log('postData'+ postDataChunk + '.');
        })
        //我们将请求路由的调用移到end事件处理程序中，以确保所有数据接收完毕后才触发，并且只触发一次，同时将postData传递
        request.addListener("end",function(){
            route(handle, pathname, response, postData);
        })
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started");
}

exports.start = start;

//本来一直出现了一个错误，在console.log("Resquest for "+pathname+"is ready");的route(handle, pathname, response);忘记删了 
//然后报了错  events.js:183throw er; // Unhandled 'error' event Error: write after end
//at write_ (_http_outgoing.js:622:15)
//at ServerResponse.write (_http_outgoing.js:617:10)
//at Object.start (C:\document\frontEnd\京城一灯\note\node\node_project\requestHandler.js:26:14)
