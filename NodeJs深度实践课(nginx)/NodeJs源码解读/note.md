https://blog.csdn.net/weixin_37625953/article/details/79946296

1. 现在本机上运行

        git clone git@ https://github.com/nodejs/node.git
        cd node 
        ./configure && make
        make install
        make test

2. 源文件分三类

![image.png](https://upload-images.jianshu.io/upload_images/7728915-f02489fba3b3808e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    纯JavaScript 写的核心模块 //都是js编写的，刚开始就应该看这一部分的代码
带NativeBinding的JavaScript核心模块 
c++文件

    我们主要学习两个文件
一个是**lib**  js实现的
一个是**src**  C++实现的
3. 接下来进行分析
![image.png](https://upload-images.jianshu.io/upload_images/7728915-3ca666ff44c3f75e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-83903cf213596790.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-65d78a5e524db021.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![lib模块下](https://upload-images.jianshu.io/upload_images/7728915-5b6340e3b0918b4a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    关于_stream_passthrougn.js和_stream_writable.js的说明：
    流（stream）是 Node.js 中处理流式数据的抽象接口。 `stream` 模块用于构建实现了流接口的对象。
Node.js 提供了多种流对象。 例如，[HTTP 服务器的请求](http://nodejs.cn/s/2RqpEw)和 [`process.stdout`](http://nodejs.cn/s/tQWUzG) 都是流的实例。

    流可以是可读的、可写的、或者可读可写的。 所有的流都是 [`EventEmitter`](http://nodejs.cn/s/pGAddE) 的实例。

    其实stream流模块是nodejs里面比较重要的。像http跟数据流相关的都是一个stream。
比如：我们把data写到服务器,那么我们就可以write，此时这个stream就是可以写，当我们从服务器读data，那么我们就可以read，此时这个stream就是可以读。 stream_duplex是双工的意思，既可以写又可以读。

![image.png](https://upload-images.jianshu.io/upload_images/7728915-a36d24811747a415.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![lib下的文件](https://upload-images.jianshu.io/upload_images/7728915-0efa146f9db81b17.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
fs.js与文件相关的操作。
module.js  包括了require这些和模块相关的操作。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-e023f285db39761d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![lib下面的文件](https://upload-images.jianshu.io/upload_images/7728915-f369d6ad3bdcc1df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4. NodeJs是怎么启动程序的？
src/node.cc  宏定义了一些东西，在.cc里面进行拓展
src/node.h#start
![image.png](https://upload-images.jianshu.io/upload_images/7728915-a2fde0a6d61c86cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![image.png](https://upload-images.jianshu.io/upload_images/7728915-ed34c274582ab657.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/7728915-2ab3f879f55a2d70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5. lib/internal/boostrap_node.js
详见参考文章：https://segmentfault.com/a/1190000005022115
Node.js 启动时第一个执行的 js 文件：bootstrap_node.js

    作为第一段被执行的 JavaScript 代码，它的历史使命免不了就是进行一些环境和全局变量的初始化工作。代码的整体结构很简单，所有的初始化逻辑都被封装在了 startup 函数中：

        // lib/internal/bootstrap_node.js
        'use strict';

        (function(process) {
          function startup() {
            // ...
          }
          // ...
          startup();
        });

    而在 startup 函数中，逻辑可以分为四块：

    * 初始化全局 process 对象上的部分属性 / 行为

    * 初始化全局的一些 timer 方法

    * 初始化全局 console 等对象

    * 开始执行用户执行指定的 JavaScript 代码