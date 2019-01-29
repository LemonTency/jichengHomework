#### 为什么要学node
***
node基于js，所以语法非常的灵活
node分成两个部分=>IOjs,nodejs
#### 走进Nodejs
***
##### 什么是Node.js
1. 是js的解释器，也就是说是js的运行环境。
2. Nodejs是一个服务器程序。
3. Node.js本身使用的是V8引擎。
4. Node.js不是Web服务器。
##### 为什么要使用Node.js
1. 为了提供高性能的Web服务，并不是为了替代谁。
2. IO性能强大（发送接收数据（输入输出）就需要IO）。
3. 事件处理机制完善。
4. 天生就能处理DOM。
##### Node.js的优势在哪里
1. 处理大流量数据
2. 适合实时交互的应用
3. 完美支持对象数据库
4. 异步处理大量并发连接（同时很多用户连接）
##### 学习Node.js的前置知识
1. JS
2. ES6
3. 一些服务器相关的知识
4. 最好在linux系统下进行开发
##### Node.js相关资料
1. node.js官网
https://nodejs.org/en/docs/
2. node.js中文网
http://nodejs.cn/
3. 在github上输入node.js就可以看到其他人用node.js写的项目和代码片段
 ##### 在linux上面安装node.js

    sudo apt-get install nodejs
    sudo apt-get install npm
#### Node.js入门
##### 包管理器npm 
1. 允许用户从NPM服务器下载别人编写的三方包到本地使用
2. 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用
3. 允许用户将自己编写的包或者命令行程序上传到NPM都供别人使用
npm官网：
https://www.npmjs.com/
##### 第一个helloworld程序
1. 在mylinux/Documents下面新建node_test文件夹
        
        mkdir node_test
2. 进入node_test文件夹

        cd node_test
3. 使用vi编辑器新建一个hello.js
  
        vi hello.js
![image.png](https://upload-images.jianshu.io/upload_images/7728915-a15024fa772d5498.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 摁ESC然后输入:wq保存并退出之后，用node命令执行一遍
  
        node hello.js

##### 开启node下的web服务

nodejs应用主要由以下几个部分组成：
1. **引入 required 模块**：我们可以使用 require 指令来载入 Node.js 模块。
2. **创建服务器**：服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器。
3. **接收请求与响应请求**：服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。

    **步骤一、引入 required 模块**

        var http = require("http");
    **步骤二、创建服务器**
接下来我们使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据

        var http = require('http');

        http.createServer(function (request, response) {

        // 发送 HTTP 头部 
        // HTTP 状态值: 200 : OK
        // 内容类型: text/plain
        response.writeHead(200, {'Content-Type': 'text/plain'});

        // 发送响应数据 "Hello World"
        response.end('Hello World\n');
        }).listen(8888);

        // 终端打印如下信息
        console.log('Server running at http://127.0.0.1:8888/');

#### Nodejs环境深入和npm详解
##### Node环境
直接在命令行输入node，就能进入这个环境（REPL==交互式解释器）
可以执行以下任务：

读取 - 读取用户输入，解析输入了Javascript 数据结构并存储在内存中。

执行 - 执行输入的数据结构

打印 - 输出结果

循环 - 循环操作以上步骤直到用户两次按下 ctrl-c 按钮退出。

* 简单的表达式运算

        $ node
        > 1 +4
        5
* 使用变量
你可以将数据存储在变量中，并在你需要的时候使用它。
变量声明需要使用 var 关键字，如果没有使用 var 关键字变量会直接打印出来。
使用 var 关键字的变量可以使用 console.log() 来输出变量。

        $ node
        > x = 10
        10
        > var y = 10
        undefined
        > x + y
        20
* 多行表达式
  
         if(a = 1){
          ... console.log(a)
          ... }
          1
    ... 三个点的符号是系统自动生成的，你回车换行后即可。Node 会自动检测是否为连续的表达式。
* 下划线(_)变量
你可以使用下划线(\_)获取上一个表达式的运算结果：
 
其他更多知识可以查看菜鸟教程
http://www.runoob.com/nodejs/nodejs-repl.html

##### npm 
npm search ’xxxx‘
npm help 
npm install 
npm help install //会弹出手册

#### node 回调函数
***
##### 什么是回调
函数调用方式分为三种：
同步调用，异步调用（消息、事件），回调。
回调是一种双向调用函数。
##### 阻塞和非阻塞
阻塞和非阻塞关注的程序在等待调用结果（消息，返回值）时的状态。
阻塞就是做不完就不准回来。
非阻塞就是你先做，我再看看有其他事没有，你做完了告诉我一声。
* 阻塞式代码
举例： 文件读写
readFileSync(阻塞式读写)

        var fs = require('fs');//第一行引入fs库

        var data = fs.readFileSync('data.txt');

        console.log(data);

        console.log(data.toString());

  然后在命令行执行node callback.js
  对data没有操作直接输出的话输出的data是十六进制的。
  输出的是<Buffer 68 68 68 68 68 68 68>
  但是用toString就会转化为字符串
  输出的是我们在data里面写的hhhhhhh
* 非阻塞式代码

        var fs = require('fs');

        fs.readFile('data.txt',function(err,data){
            if(err){
                return console.error(err);
        }
        console.log(data.toString());

        })

        console.log('程序执行完毕');

   输出结果：
程序执行完毕
hhhhhhh
所以说非阻塞式代码不会等待执行结果直接跳到下一步。所以先打印程序执行完毕。

#### Nodejs事件驱动机制
***
##### Nodejs运行机制
Nodejs是单线程的程序，并不能并发的完成多件事情。
Nodejs中的每个API都是异步执行的，都是作为独立的线程在运行，从而我们可以使用这种机制来进行并发处理。

##### 事件驱动模型（事件驱动的IO模型）

![image.png](https://upload-images.jianshu.io/upload_images/7728915-396ac3b8876b3f7a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 事件处理代码流程
1. 引入events对象，创建eventEmitter对象。
2. 绑定事件处理程序。
3. 触发事件。

上代码：

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

  所以当emit connection的时候就会触发connectionHandler函数，就会打印出'connected被调用！'

#### Node.js模块化
***
文件模块缓存区是为了不缓存同一个模块
##### Nodejs的模块加载方式
1. 从文件模块缓存中获取
2. 从原生模块获取
3. 从文件加载
##### require方法加载模块

require方法接收一下几种参数的传递：
* http fs path等原生模块
* ./mod或../mod,相对路径的文件模块
* /path/mod,绝对路径的文件模块
* mod,非原生模块的文件模块
推荐使用相对路径进行查找，为什么要慎重使用绝对路径呢？
因为在生产环境和开发环境可能路径会不一致，所以有可能会出现问题。

新建hello.js文件

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
新建main.js

    //-----调用模块的文件
    //调用Hello模块
    var Hello = require('./hello');

    hello = new Hello();
    hello.setName('zty');
    hello.sayHello();
![image.png](https://upload-images.jianshu.io/upload_images/7728915-cf9adf2c8b8fea11.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### Nodejs函数
* 把函数作为变量直接传递。


    function say(word){
        console.log(word);
    }

    function execute(someFunction, value){
        someFunction(value);
    }

    execute(say,'hello');//hello

* 使用匿名函数进行传递。

      function execute(someFunction,value){
          someFunction(value);
      }

      execute(function(word){console.log(word)},'hello')//hello

在Nodejs中都是这样的运用，如下：

    var http = require('http');
    http.createServer(function(request,response){
        response.writeHead(200,{'Content-type':'text/plain'});
        response.write('hello world zty');
        response.end();
    }).listen(8000);

#### Nodejs路由
***
http://www.runoob.com/nodejs/nodejs-router.html
1. 需要的所有数据都会包含在 request 对象中，该对象作为 onRequest() 回调函数的第一个参数传递

          function onRequest(request, response) {
          }
2. 用 querystring 模块来解析 POST 请求体中的参数
##### 新建http.js

    var http = require("http");
    var url = require("url");
 
    function start() {
      function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
      }
 
      http.createServer(onRequest).listen(8888);
      console.log("Server has started.");
    }
 
    exports.start = start;

##### 新建一个apphttp.js引用http.js

      var server = require('./http');
      server.start();
此时在命令行中输入node apphttp.js，会发现打印出Server has started,打开localhost:8888会看见helloworld。

##### 新建一个路由文件router.js

        function route(pathname) {
          console.log("About to route a request for " + pathname);
        }
 
        exports.route = route;
##### 映射到处理程序
localhost:8888  controller/action
话不多说，直接上程序
router.js

    var http = require("http");
    var url = require("url");
    
    function start(route) {
      function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
    
        route(pathname,response);
    
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
      }
    
      http.createServer(onRequest).listen(8888);
      console.log("Server has started.");
    }
    
    exports.start = start;

apphttp.js(等下就node apphttp.js)

        var server = require("./http");
        var router = require("./router");
        
        server.start(router.route);

输入localhost:8888可以看到helloworld
输入localhost:8888/index/home，可以看到hello。
**突然间发现了favicon.ico 网页F12出现favicon.icon not found的原因。**
原来就是网页title旁边的icon,一般和logo一样。大小一般控制在16*16px或32*32px，大了影响加载速度，还可能导致浏览器不进行缓存，添加方式通常这样（一般开发方式，路径也可能视情况修改）。

#### Nodejs全局方法和工具
*** 
http://www.runoob.com/nodejs/nodejs-global-object.html
global 最根本的作用是作为全局变量的宿主，按照 ECMAScript 的定义，满足以下条 件的变量是全局变量：
* 在最外层定义的变量；
* 全局对象的属性；
* 隐式定义的变量（未定义直接赋值的变量）。


实例：
1.  __filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径
// 输出全局变量 __filename 的值


    console.log( __filename );
//运行

    $ node global
    C:\document\frontEnd\京城一灯\note\node\global.js

2. __dirname  表示当前执行脚本所在的目录。
// 输出全局变量 __dirname 的值

        console.log(__dirname);
运行

        $ node global
        C:\document\frontEnd\京城一灯\note\node
#### 文件系统
http://www.runoob.com/nodejs/nodejs-fs.html