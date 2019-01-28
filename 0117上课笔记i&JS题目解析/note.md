#### 变量提升
***
请写出下面的执行结果，并解释原因

            alert(a);
            yideng();
            var flag = true;
            if(!flag){
                var a = 1;
            }
            if  (flag) {
                function yideng() {
                    console.log("yideng1");
                }
            } else {
                function yideng() {
                   console.log("yideng2");
                }
             }

//undefined,yideng is not a function
第二个，在没有if执行语句的时候，只是把var yideng 提升到的当前作用域的顶端，此时yideng=undefined而不是一个函数值，所以yideng()就会出现错误`yideng is not a function`

#### 变量回收
***
请问变量a会被GC回收么，为什么呢？

        function test(){
            var a = "yideng";
            return function(){
                eval('');
            }
        }
        test()();
不会，因为eval会欺骗词法作用域。浏览器不知道这里yideng需不需要被eval用到，所以就没敢回收。所以,eval就禁止了这段函数的优化。
**有什么方式解决这个问题呢？**

        function test(){
            var a = "yideng";
            return function(){
                window.eval('');
            }
        }
        test()();
将这里的eval前面加上window，让eval在全局作用域下面。那么在test()这个函数作用域里面的在函数执行完的时候不需要用到的变量就会被GC回收。




1. 什么是词法作用域
词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变 。也就是说，词法作用域在你写好程序的时候就已经固定好了。
2. 但是在js中，有两种方式可以改变词法作用域（欺骗词法作用域）。不过，并不推荐这样使用，欺骗词法作用域会导致更低下的性能。
*  eval（）函数。可接受一个字符串为参数，将其中内容视为好像在书写时就在这个地方的代码。

        function foo(str,b){
            eval(str,b);
            console.log(a,b);
        }
        var a = 2;
        foo("var a = 5",7); //5,7
按照正常的逻辑来讲，这里可能是undefined，但是我们看到这里却是5，7，因为eval（）函数却欺骗了词法作用域，直接将a放在了foo内部，而导致引擎不需要到外层作用域去查找，直接使用 a = 5 ，从而达到此法欺骗。
请注意，**在严格模式的程序中，eval()在运行时有其自己的词法作用域，意味着其中的声明无法修改所在的作用域。**
* with ()

       function foo(obj){
            with(obj){
                a = 5;
            }
        }
        var obj1 = {
            a:1
        }
        var obj2 = {
            b:2
        }

        foo(obj1);
        console.log(obj1.a); //5
        foo(obj2);
        console.log(obj2.a); //undefined
        console.log(window.a); //5 内存泄漏

    with语句也可以达到欺骗词法的作用，但是副作用也很明显，造成了变量泄露。原因是调用obj2的时候，其没有变量a，进行LHS查询，最后隐式创建全局变量属性a ，导致变量泄露

##### 内存快照
        function yideng(color){
            this.color = color;
        }
        var s = new yideng()
  此时我们看到的内存情况是这样的：
    ![image.png](https://upload-images.jianshu.io/upload_images/7728915-6e940d54af41c6f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到distance=2,yideng这个类没有被回收，当我们把原来代码修改为

        function yideng(color){
            this.color = color;
        }
        var s = new yideng();
        s = null;
![image.png](https://upload-images.jianshu.io/upload_images/7728915-46516121325a37d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
说明yideng已经被回收了。

#### 原型链
***
请说出输出值，并解释为什么？

        Object.prototype.a = 'a';
        Function.prototype.a = 'a1';
        function Person(){
        }
        var yideng = new Person();
        console.log('p.a:'+yideng.a); //
        console.log(1..a);
        console.log(1.a);

很重要的两点：

    yideng.__proto__  = Person.prototype;
    Person.prototype.__proto__ = Object.prototype;
所以在Object上面找到 Object.prototype.a = 'a';、
因为var a = 1跟var a = new Number(1)是一样的，也就是说1的构造函数是Number。

    1.__proto__ = Number.prototype;
    Number.prototype.__proto__ = Object.prototype;
所以就找到了Object的原型链上面。

那么问题来了，为什么1..a可以输出a?1.a却会出错呢？
因为.是`关键字`，1.a中的.给1是可以的，给a也是可以的，但是究竟应该给谁呢？因为单独1.   那a代表什么？ 如果单独.a那么1单独出来又错了。所以在语法解析阶段就出现了错误。
所以1..a的意思就是要求出1.的a属性，顺着原型链就找到了a。

#### ES6元编程
***
ES6元编程资源整合：https://segmentfault.com/a/1190000016133613

[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)、[Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/reflect) 和 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 是属于 ES6 元编程范畴的，能“介入”的对象底层操作进行的过程中，并加以影响。元编程中的 **元** 的概念可以理解为 **程序** 本身。

”元编程能让你拥有可以扩展程序自身能力“。

怎么理解呢？若程序甲可以输出 A - Z，那么写程序甲算`编程`；而程序乙可以生成程序甲（也许还会连带着运行它输出 A - Z），那么编写程序乙的活动，就可以算作 `meta-programming`，`元编程`。

在 ES6 之后，标准引入了 Proxy & Reflect & Symbols，从而提供比较完善的元编程能力。

##### proxy
        let tency = {
            age:18
        }
tency.age = "iu";在没有设定任何规则的时候这个是可以的执行的，但是我们想要达到的效果就是tency.age不能是除了数字以外的其他类型,所以我们用proxy拦截tency并进行一些设置。
        
        let tency = {
            age:18
        }
        const validator = {
            set(target,key,value){
                if(typeof value != 'number'){
                    throw new TypeError("年龄必须是数字");
                }
            }
        }
        const proxy = new Proxy(tency,validator);
        proxy.age = "iu";
此时就会抛出错误。TypeError: 年龄必须是数字
##### Symbol
Symbols用于实现的反射（Reflection within implementation） -- 把它们用在你现有的类和对象上来改变行为。

Symbols 能被用作对象的 key。这意味着你可以分配无限多的具有唯一性的 Symbols 到一个对象上，这些 key 保证不会和现有的字符串 key 冲突，或者和其他 Symbol key 冲突。`Symbols key` 无法通过` for in`、`for of` 或者 `Object.getOwnPropertyNames` 获得 —— 获得它们的唯一方式是 `Object.getOwnPropertySymbols`。
那么，我们能用Symbol做什么？
对常规的对象的一些本来就有的行为（遍历等）进行一些设置。
对对象开启规则或者验证阻止一些对象常规的递归的应用（例如遍历只遍历偶数的）
主要程序

        const arr = [2,3,4,5,6,7];
        arr[Symbol.iterator] = function* (){
                yield xx;
        }
        for(const x of arr){
            console.log(x)
        }
如果我们指向让他输出偶数位数字的话，就可以把上面的代码修改为

        const arr = [2,3,4,5,6,7];
        arr[Symbol.iterator] = function* (){
            let idx = 1;
            console.table(this);
            do{
                yield this[idx];
            }while((idx += 2) < this.length)  
        }
        for(const x of arr){
            console.log(x)
        }
![image.png](https://upload-images.jianshu.io/upload_images/7728915-736c898d46f0031b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### Reflect
Reflect让js书写起来更加具有可控性。
reflect-metadata
https://www.npmjs.com/package/reflect-metadata
https://www.jianshu.com/p/653bce04db0b

    Reflect.defineMetadata(metadataKey, metadataValue, C.prototype, "method");
ps: 一定要好好去使用。

##### __TCO_ENABLED
在递归中的元编程

        function sum(x,total){
            console.trace();
            if( x === 1){
                return x + total;
                __TCO_ENABLED = true;
                //让浏览器强制开启尾递归优化
            }return sum(x - 1, x+total);
        }
        sum(5.0)

#### 异步编程
async await 
有一个困扰我很久的问题，await到底有啥用。
https://www.cnblogs.com/YMaster/p/6920441.html

        let sleep = function (time) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, time);
            })
        };

        let howLongToSleep = async function () {
            // 在这里使用起来就像同步代码那样直观
            console.time();
            console.log('start');
            await sleep(3000);  //sleep 为一个执行需要耗费 3s 的函数
            console.log('中间');
            await sleep(3000); 
            console.log('end');
        };
        howLongToSleep();//start三秒之后是'中间'，再过三秒之后是'end'

async 表示这是一个 async 函数，而 await 只能在这个函数里面使用。

await 表示在这里等待 await 后面的操作执行完毕，再执行下一句代码。

await 后面紧跟着的最好是一个耗时的操作或者是一个异步操作(当然非耗时的操作也可以的，但是就失去意义了)。
其实在使用 async/await 的时候最简单的场景就是当你需要执行一个耗时操作时或者必须为异步操作时就可以直接上，使用 async 来执行你的函数，在这个函数内部 使用 await 关键字来达到异步执行的最终目的：**执行完毕（异步执行）了，可以运行下一行代码了！**
看下面的题目：请在【代码书写处】写上代码使其得到我们想要的输出

       const timeout = ms =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                    }, ms);
                });
                const ajax1 = () =>
                    timeout(2000).then(() => {
                        console.log("1");
                        return 1;
                    });
                const ajax2 = () =>
                    timeout(1000).then(() => {
                       console.log("2");
                        return 2;
                    });
                const ajax3 = () =>
                    timeout(2000).then(() => {
                        console.log("3");
                        return 3;
                    });
                const mergePromise = (ajaxArray) =>{

                   //1,2,3 done [1,2,3]
                    //【代码书写处】
                    } 

                mergePromise([ajax1, ajax2, ajax3]).then(data => {
                    console.log("done");
                    console.log(data); // data 为 [1, 2, 3]
                })

解题思路：使用async和await，await使得ajax1执行完之后才会执行下一个ajax2，ajax2执行完之后才会执行ajax3.把每次返回的结果都压到栈result里面。


                const mergePromise = (ajaxArray) =>{
                    async function test(){
                        let result = [];
                        for(let i of ajaxArray){
                            let item = await i();
                            result.push(item);
                        }
                        return result;
                    }
                    return test();
              } 
还可以使用另外一种方法，就是让把递归拉平的思路,也能得到想要的结果

            const mergePromise = async function(ajaxArray){
                let data = [];
                while(ajaxArray[0]){
                    await ajaxArray[0]().then(res => data.push(res),ajaxArray.shift())
                    }
                return data;
                }

#### 同步队列异步队列

                $('#test').click(function(argument) {
                    console.log(1);
                });
                setTimeout(function() {
                    console.log(2);
                }, 0);
                while (true) {
                console.log(Math.random());
                }
请问点击<buttion id=“test”></button>会有反应么？为什么？能解决么？
回答：没有反应。因为while(true)同步队列里面一直在循环。并没有轮到异步队列。
##### Concurrent.Thread.js
http://www.cnblogs.com/0banana0/archive/2011/06/01/2067402.html
Concurrent.Thread.js是一个日本人开发的，用来让javascript也进行多线程开发的包，可以让我们将耗时的任务利用前端来模拟多线程。有了Concurrent.Thread，就有可能自如的将执行环境在线程之间进行切换。
首先要下载这个库，然后再引入。然后我们就可以修改成下面这个样子。

    <body>
        <div id = "btn">点击我</div>
        <script src = "Concurrent.Thread.js"></script>
        <script>
            var btn = document.getElementById('btn');
            Concurrent.Thread.create(function(){
                btn.onclick = function(){
                alert('ksjsjsjj');
                }
              /*下面有一段特别复杂的函数*/
            while (true) {
                console.log(Math.random());
                }
            });
        </script>
    </body>

##### Web Worker
http://www.ruanyifeng.com/blog/2018/07/web-worker.html
###### 基本用法
* 主线程
主线程采用 `new`命令，调用`Worker()`构造函数，新建一个` Worker` 线程。

      var worker = new Worker('work.js');
   `Worker()`构造函数的参数是一个脚本文件，该文件就是 Worker 线程所要执行的任务。由于 Worker 不能读取本地文件，所以这个脚本必须来自网络。如果下载没有成功（比如404错误），Worker 就会默默地失败。

  然后，主线程调用`worker.postMessage()`方法，向 Worker 发消息。

        worker.postMessage('Hello World');
        worker.postMessage({method: 'echo', args: ['Work']});
  `worker.postMessage()`方法的参数，就是主线程传给 `Worker` 的数据。它可以是各种数据类型，包括二进制数据。

  接着，主线程通过`worker.onmessage`指定监听函数，接收子线程发回来的消息。

      worker.onmessage = function (event) {
        console.log('Received message ' + event.data);
        doSomething();
      }

       function doSomething() {
        // 执行任务
        worker.postMessage('Work done!');
      }
  上面代码中，事件对象的data属性可以获取 Worker 发来的数据。
Worker 完成任务以后，主线程就可以把它关掉。

       worker.terminate();

###### 应用在我们的题目上
   在同一个目录下面新建task.js文件

      while(true){
          postMessage(Math.random());
          //postMessage后面是要运行的子线程
      }
主线程文件：

    <body>
        <div id = "btn">点击我</div>
        <script>
            var btn = document.getElementById('btn');
                btn.onclick = function(){
                alert('ksjsjsjj');
                }
            var worker = new Worker('task.js');
            worker.onmessage = function(){
                console.log(event.data);
            }
        </script>
    </body>
注意：Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。所以不能直接在本地跑。

#### 按值引用按地址引用

                var s = [];
                var arr = s;
                for (var i = 0; i < 3; i++) {
                    var pusher = {
                        value: "item"+i
                    },tmp;
                    if (i !== 2) {
                        tmp = []
                        pusher.children = tmp
                    }
                    arr.push(pusher);
                    arr = tmp;
                }
                console.log(s[0]);
最后输出结果是[value:item0,children:[value:item1,children:[value:item2]]]
为什么呢？
模拟指针移动。
1. 当i = 0时，arr和s指向同一个地址,tmp自己指向一个地址。pusher.children指向tmp。
此时，push = {value:item0,children:tmp};
2. 当i = 1时，arr和tmp指向同一个地址。此时的arr等于pusher也就是value:item1,children:tmp。
3. 当i = 2时，arr和tmp还是指向同一个地址，此时的arr等于pusher也就是value:item2

画图：
![image.png](https://upload-images.jianshu.io/upload_images/7728915-208f540f2def6506.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)