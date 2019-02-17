#### 当今前端的架构
***
1. spa  :(vue-cli ,React-App, html+css+jq)=>dist
打包出来的文件dist与后台暴露出来的API进行调用,这种模式对于前后端分离不是特别好。
CSR：浏览器端渲染。
2. node+spa：
打包出来的文件dist和node一起打包放在服务器上（为了减少跨域），node和后台java进行通信。
3. SSR（服务端渲染） + MPA（多页应用）
4. 同构化（前端后端用同一套渲染模板）
##### node在前端存在的意义：
 * 性能指标，
* 削减API，
* 让FE也能跑整个项目，实现真正前后端分离
vue既能做前端渲染也能做服务端渲染
#### NodeJS异步IO原理浅析及优化方案
***
#####  异步IO的好处
1. 前端可以通过异步IO消除堵塞
2. 同步请求A,B，则消耗时间 A+B，异步的时候消耗时间Max(A,B)
3. 随着系统的复杂，A+B+....和Max(A,B,...)的差异会越来越大
4. **I/O是昂贵的，分布式I/O更加昂贵**。
为什么说分布式I/O更加昂贵？
因为分布式的数据是不在主机上而是在远程的服务器上面的。所以要经CPU缓存->网络，网络要花费的时钟周期是更加长的。
5. **NodeJS适用于 IO密集型不适用CPU模型**（CPU适用于大量的运算）。IO密集型应用场景之一：游戏频繁放大招等。
面试的时候经常会问到第4第5题。

底层知识
    1. CPU时钟周期： 1/cpu主频 -> 1s/3/1GHz
![image.png](https://upload-images.jianshu.io/upload_images/7728915-29737c933d2768a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    2. 操作系统对计算机进行了抽象，内核在进行文件I/O操作时，通过文件描述符进行管理。异步IO不带数据直接返回。要获取数据就要通过文件描述符再次进行操作。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-dd31683f02f09621.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    3. 为什么js是单线程？因为js的诞生本来就是为了处理DOM，如果是多线程的，同时有两个操作对同一个DOM进行不同的修改，那么应该听谁的？
##### Node对异步IO的实现
异步编程的`难点`在于请求与响应不是按顺序发生的。以http server 为例，异步编程赋予了server 高并发的品质，而且他可以以很小的资源代价，不断地接受和处理请求。但是快速处理请求不表示快速地返回请求=>高并发不等同于快速反馈。在Nodejs中，`libuv`则为异步编程的实现提供了可能
完美的`异步IO`应该是应用程序发起非阻塞
调用，无需通过遍历或者事件幻想等方式轮询。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-b3ae72daeea689b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
NodeJS中的event loop和浏览器中的event loop是不一样的。
在Node中，LIBUV掌管事件循环
LIBUV相关文章：
https://blog.csdn.net/shixin_0125/article/details/78944475
http://www.mamicode.com/info-detail-2213450.html
![image.png](https://upload-images.jianshu.io/upload_images/7728915-f5dc46e4187b1a8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

有几个特殊的API
1. setTimeout 和setInterval线程池不参与
2. setImmediate();比process.nextTick()优先级低 
3. process.nextTick() 实现类似SetTimeout(function(){},0);每次调用放入队列中，在下一轮循环中取出
4. NodeJS怎么实现一个sleep

        async function test() {
            console.log('Hello')
            await sleep(1000)
            console.log('world!')
        }
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        } 
        test()

接下来，看看下面代码的运行结果~

        setTimeout(function () {
        console.log(1);
        }, 0);
        setImmediate(function () {
        console.log(2);
        });
        process.nextTick(() => {
        console.log(3);
        });
        new Promise((resovle,reject)=>{
        console.log(4);
        resovle(4);
        }).then(function(){
        console.log(5);
        });
        console.log(6);
//4，6，3，5，1，2
promise一定义就执行.打印出4,注意：promise的then才是异步的,promise不是异步的。
然后就继续执行打印出6。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-430f63572e91435c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
而process.nextTick则会插队，插到等待队列的最前面（不管你是在什么时候定义的），也就是当前的同步任务只要一执行完，马上就执行process.nextTick(),所以就打印出3
then的优先级比setTimeout要高。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-4b736ca062b4b242.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因为setImmediate和setTimeout都是插到了异步队列的最后面。
因为 setTimeout, setImmediate设置的时间都是0，所以是跟出现的先后关系有关。

##### 函数式编程在Node中的应用。
* 高阶函数： 将函数作为输入或者返回值

        app.use(function(){})
        var emitter = new events.EventEmitter;
        emitter.on(function(){})
* 偏函数：指定部分参数产生一个新的定制函数的形式就是偏函数。
看到偏函数就情不自禁想起柯里化，这究竟有什么区别呢？
https://www.cnblogs.com/guaidianqiao/p/7771506.html
柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个一元函数。
局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数。
下面是柯里化：

        function add(x){
              return function(y){
                  return x + y
            }
        }
    add(1)(3);

    下面是偏函数：
    
        function add(a, b) {
            return a + b;
        }
        var addOne = add.bind(null, 1);
        addOne(2) // 3

##### 常见的Node控制异步技术手段
1. Step,wind(提供等待的异步库)

2. **Async,Await**

3. Promise是高级接口（一旦定义就不能被改变），事件是低级接口（更加灵活）

4. 由于Node基于V8,目前还不支持协程

5. 一个程序可以包含多个协程，可以对比与一个进程包含多个线程，因而下面我们来比较协程和线程。我们知道多个线程相对独立，有自己的上下文，切换受系统控制；而协程也相对独立，有自己的上下文，但是**其切换由自己控制，由当前协程切换到其他协程由当前协程来控制。** 

##### 内存管理和优化
1. V8垃圾回收机制
* Node使用分代式垃圾回收机制。新生代为存活时间较短对象，老生代为存活时间较长的对象。
GC(垃圾回收)一句话概括：小孩子尽管玩，大人收拾
什么样的变量才是新生代？什么样的变量是老生代？
在scanvenge算法中换流5次以上或者要复制到空间的时候发现已经被占了25%了，那么这个变量就会变成老生代的。
* 新生代scanvenge算法
![image.png](https://upload-images.jianshu.io/upload_images/7728915-eb156dfe207f9660.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
https://blog.csdn.net/qinghua9/article/details/38117715
https://blog.csdn.net/HaoDaWang/article/details/54837493
使用复制方式来实现垃圾回收。它会将堆内存一分为二，在这两个空间里面，只有一个会使用。另一个闲置，分别是from/to 空间，当我们分配对象时，会在From空间中进行分配，在回收时，会检查from里面存活的对象，然后复制到to空间，非存活的对象会被释放掉。完成后，两个空间的功能会做一个切换。
* 老年代回收算法：Mark-sweep与Mark-Compact

![image.png](https://upload-images.jianshu.io/upload_images/7728915-e3fc703ec84d3f92.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

   V8老生代主要采用Mark-Sweep和Mark-compact,在使用Scavenge不合适。一个是对象较多（老生代里面的存活周期会比较长）需要赋值量太大而且还是没能解决空间问题。Mark-Sweep是标记清除的方法，标记那些死亡的对象，然后清除。但是清除过后出现内存不连续的情况，所以我们要使用Mark-compact，他是基于Mark-Sweep演变而来的，他先将活着的对象移到一边，移动完成后，直接清理边界外的内存。当CPU空间不足的时候会非常的高效。V8后续还引入了延迟处理，增量处理，并计划引入并行标记处理。

   与scavenge相比，mark_sweep不会将内存空间分为两半，所以，不会浪费一半空间，它会在标记阶段遍历堆中的所有对象，并标记活着的对象，在随后的清除阶段中，只清除没有被标记的对象，所以，和Scavenge相比，mark_sweep只清理死亡的对象，而scavenge只复制活着的对象。这和新生代堆和老年代堆的特点有关。活的对象在新生代中只占较小的部分，而死的对象在老生代中只占较小部分，所以，这两种方式对于大多数情况下的新生代和老生代都比较高效。
-------------要讲的清楚

2. 何时启动GC

    一般来说对于虚拟机而言，其中一种方法就是在内存不足的时候，即（malloc()返回null时），不过，真到这时候内存已经基本上耗完了。所以当堆的消耗量超过了设定的阀值就启动GC。

        var s = 1;

        var a = {
            b:{
                c:1
            }
        }

        console.log(c)



    新生代scanvenge算法中，scanPointer 是 扫描指针，allocatePointer
是 分配指针。

    https://www.cnblogs.com/jasonxuli/p/6041909.html

   像上面的例子中，最开始将a拷⻉到TO区域，这时分配指针不再与扫描指针重合，永远指向下⼀个可分配的对象（TO区域中变量的第一个空白的地址）。
    
   第一次从scanPtr（扫描指针）处取一个对象a,下移scanPtr，此时检查到a的内部指针是指向b的，这个指针还在From区域，并且在To

   每次从scanPtr（扫描指针）处取一个对象obj，下移scanPtr，然后检查obj的内部指针。
1，如果某个指针没有指向From区域，那么肯定指向了老区。
2，如果发现某个指针指向了From区域的对象并且这个对象没有被复制到过To区域（没有forwarding address），那么把它复制到To区域的最后（allocationPtr的位置），然后设置forwarding address到新的副本，并且下移allocationPtr。也因此是广度优先搜索，因为这个对象以后还会经历一次其内部指针的扫描。
    扫描指针移动直到再重合结束GC.(⼴度优先）

   引⽤计数是计算机编程语⾔中的⼀种内存管理技术，是指将资源（可
以是对象、内存或磁盘空间等等）的被引⽤次数保存起来，当被引⽤次
数变为零时就将其释放的过程。使⽤引⽤计数技术可以实现⾃动资源管
理的⽬的。同时引⽤计数还可以指使⽤引⽤计数技术回收未使⽤资源的
垃圾回收算法。
内存不够用开启合并定时增量。

    V8垃圾回收机制
    Process.memoryUsage
    rss ：所有内存使用包括堆区和栈区
    heaptTotal：堆区占用内存
    heapUsed：已使用到的堆部分
    external: V8引擎C++对象占用(GC动态变化)
  
![image.png](https://upload-images.jianshu.io/upload_images/7728915-09cc0eacb32fcd3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-a61b49e80088fb40.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


   两个内存快照进行比较（memory中的snapshot）。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-c8e5d25172456a12.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 常见内存泄露问题
1. 无限制增长的数组
2. 无限制设置属性和值
不要在node里面对一个变量进行无限制的赋值
3. 任何模块的私有变量和方法均是永驻内存的 a = null
4. 大循环，无GC机会

内存泄露分析
node-inspector
* 安装
cnpm install -g node-inspector安装失败
解决方式
cnpm install -g node-inspector@0.7.5
* 实践
https://www.cnblogs.com/pugang/p/5402150.html
在跑的时候却遇到了一些问题，解决方法在下面
https://stackoverflow.com/questions/44662442/node-inspector-not-starting

相关指令代码：

    node-inspector
    console.log("Server	PID",	process.pid);
    top	-pid	2322
    sudo	node	--inspect	app.js
    while	true;do	curl	"http://localhost:1337/";	done

##### 标题是？

NET多层架构
https://blog.csdn.net/num197/article/details/80183298
从下至上分为三层，分别为：DAL（数据处理层）、BLL（业务逻辑层）、UI（用户接口层） 
1）数据访问层（database access layer，DAL）：有时候也称为是持久层，其功能主要是负责数据库的访问。简单的说法就是实现对数据表的Select，Insert，Update， Delete的操作。如果要加入ORM的元素，那么就会包括对象和数据表之间的mapping，以及对象实体的持久化； 
2）业务逻辑层（business logic layer， BLL）：是整个系统的核心，它与这个系统的业务（领域）有关； 
3）表示层（user interface layer， UIA）：是系统的UI部分，负责使用者与整个系统的交互。在这一层中，理想的状态是不应包括系统的业务逻辑。表示层中的逻辑代码，仅与界面元素有关； 
4）实体模型层（Model）：包含了所有的数据信息，这些数据信息以各种Entity实例的形式存在。是整个系统基础层次；
![image.png](https://upload-images.jianshu.io/upload_images/7728915-d201344ea34e470d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![NET多层架构](https://upload-images.jianshu.io/upload_images/7728915-f3bb8538e737aa5d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### Node集群的应用

##### PM2


##### 预备上线
* 前端工程话的搭载动态文件的MAP分析压缩打包合并至CDN

##### 服务器集群
* 前端工程化的搭载动态文件的MAP分析压缩

##### 经典代码
NodeJS容错



