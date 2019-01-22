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

