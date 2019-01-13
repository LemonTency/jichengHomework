函数式编程初探
http://www.ruanyifeng.com/blog/2012/04/functional_programming.html
函数式编程入门教程
http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html

 [JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)


#### 一、函数式编程的5个特点
***
1. 函数是第一等公民
指的是函数与其他数据类型一样，处于平等地位，可以赋值给其他变量，也可以作为参数，传入另一个函数，或者作为别的函数的返回值。
2. 只用表达式，不用语句
表达式=单纯的运算，有返回值
语句=执行某些操作（读写I/O），没有返回值
原本函数的出现就只是为了单纯的运算。
3. 没有副作用
也就是说函数要保持独立，所有功能就是返回一个新的值，没有其他行为，尤其是不得修改外部变量的值。
4. 不修改状态
函数只是返回一个值，而不是修改变量（特别是全局变量）
5. 引用透明
不依赖外部的状态，只依赖于输入的参数

#### 二、函数式编程的重要概念
***
范畴：满足某种变形关系的所有对象，包括`值（value）`，`值的变形关系`，也就是函数。这个变形关系只能作用于单独的该容器下面的一个元素。

函子：将一个范畴转成另一个范畴。它的变形关系可作用于当前容器的每一个元素。

态射：同一个范畴的所有成员，就是不同状态的"变形"（transformation）。通过"态射"，一个成员可以变形成另一个成员。




高阶函数：
纯函数可以记忆（同样的输入总有同样的输出）， 不跟外界有任何关系， 抽象代码方便单元测试

在项目中，新建一个独立的js文件存放函数式编程代码，新建共有的common.js->libs。

常用函数式编程的库：RxJS cycleJS lodashJS underscoreJS  ramdajs 

#### 三、纯函数
****
 对于相同的输入，只会得到相同的输出。没有副作用，也不依赖外部的一些状态。（slice 和splice）。

        var a = [1,2,3,4,5];
slice是纯函数

        a.slice(1,3); [2,3]
        a.slice(1,3);[2,3]
splice不是纯函数，因为有副作用，会更改a

        a.splice(1,3);[2,3,4]
        a.splice(1,3);[5]

纯函数不仅可以有效降低系统的复杂度，还具有可缓存性。

        import _ from 'lodash'
        var sin = _.memorize(x => Math.sin(x));

        //第一次计算的时候会慢一点

        var a = sin(1);

        //第二次有了缓存速度极快

        var b = sin(1);
#### 四、函数的柯里化
***
函数的柯里化传递给参数一部分参数来调用它，让他**返回一个函数去处理剩下的参数**。
柯里化之前：
      
        function add(x,y){
            return x+y;
        }
        add(1,2)
柯里化之后：

        function addX(y){
            return function(x){
                return y+x;
            }
        }
        addX(2)(1)
首先执行 addX(2)，然后再给返回的函数传递参数x=1，所以就是addX(2)(1)。
#### 五、函数组合
***
如果一个值要经过多个函数，才能变成另外一个值，就可以把所有中间步骤合并成一个函数，这叫做"函数组合"（compose）

`X`和`Y`之间的变形关系是函数`f`，`Y`和`Z`之间的变形关系是函数`g`，那么`X`和`Z`之间的关系，就是`g`和`f`的合成函数`g·f`。
合成两个函数的简单代码如下。

    const compose = function (f, g) {
      return function (x) {
        return f(g(x));
      };
    }
而且函数的组合还必须满足结合律：

    compose(f, compose(g, h))
    // 等同于
    compose(compose(f, g), h)
    // 等同于
    compose(f, g, h)
看看下面的代码

        const compose = (f,g) => (x => f(g(x)));
        var first = arr => arr[0];
        var reverse = arr => arr.reverse();
        var last = compose(first,reverse);
        last([1,2,3,4])

 compose就是将(f,g)的代码转变为f(g(x))，将两个函数组合起来。

#### 六、Point Free
***
将一些对象自带的方法转化为纯函数，不要命名转瞬即逝的中间变量。

#### 七、惰性函数：
***
惰性函数表示函数执行的分支只会在函数第一次调用的时候执行，在第一次调用过程中，该函数根据一定的条件被覆盖为另一个按照合适方式执行的函数（重写），这样任何对原函数的调用就不用再经过执行的分支了。

例如ajax的封装
原来我们可以写成

      function createXHR(){
            if (typeof XMLHttpRequest != "undefined"){
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined"){
                if (typeof arguments.callee.activeXString != "string"){
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                                    "MSXML2.XMLHttp"];
            
                    for (var i=0,len=versions.length; i < len; i++){
                        try {
                            var xhr = new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            return xhr;
                        } catch (ex){
                            //skip
                        }
                    }
                }
                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }
在不同的分支条件下会return不同的ajsx对象出来。但是每次执行这个函数的时候都要进行对浏览器环境进行判断，其实可以对他进行改进。

          function createXHR() {
            if (typeof XMLHttpRequest != "undefined") {
                createXHR = function () {
                    return new XMLHttpRequest();
                }//对函数进行重写，如果浏览器满足这个条件就会被对应的分支语句所重写，下次就不用去判断条件了
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                var curxhr;
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                    "MSXML2.XMLHttp"];

                for (var i = 0, len = versions.length; i < len; i++) {
                    try {
                        var xhr = new ActiveXObject
                        createXHR = function () {
                            return new ActiveXObj(versions[i]);
                        curxhr = versions[i];ect(curxhr);
                        }
                        //重写函数
                        return xhr;
                    } catch (ex) {
                        //skip
                    }
                }
            } else {
                throw new Error("No XHR object available.");
            }
        }
一旦有一次判断好了浏览器环境并进入相对应的分支，就把这个函数重写，下次如果还要使用这个函数的话就不会再判断浏览器环境不用执行分支了。
https://www.cnblogs.com/pigtail/p/3442463.html
#### 八、高阶函数
***
函数当参数，把传入的参数做一个封装，然后返回这个封装的函数，达到更高程度的抽象。

        var add = function(a,b){
            return a+b;
        }
        function math(func,array){
            return func(array[0],array[1])
        }

        math(add,[1,2])

#### 九、递归与尾递归
***
http://www.ruanyifeng.com/blog/2015/04/tail-call.html
了解尾递归之前，先了解一下尾调用。
* 尾调用
当一个函数执行时的**最后一个步骤**是**返回另一个函数**的调用，这就叫做尾调用。

  判断一下下面哪些函数是尾调用？

        function foo(data) {
            a(data);
            return b(data);
        }
  像这里的b(data)就是尾调用。

      function foo1(data) {
         return a(data) + 1;
      }
      function foo2(data) {
        var ret = a(data);
        return ret;
      }
      function foo3(data) {
        var ret = a(data);
        return (ret === 0) ? 1 : ret;
      }
  对于foo1,最后一个动作是+1操作，并非是直接函数调用。
foo3,是经过计算返回的结果，也不是尾调用。
foo2也不是尾调用，尾调用很重要的特性就是它可以不在调用栈上面添加一个新的堆栈帧，而是更新它。

* 尾递归
  若一个函数在尾位置调用本身（或是一个尾调用本身的其他函数等），则称这种情况为**尾递归**，是递归的一种特殊情形。

  递归需要保存大量的调用记录，很容易发生栈溢出错误，如果使用尾递
归优化，将递归变为循环，那么只需要保存一个调用记录，这样就不会发生栈溢出错误了。我们可以对递归进行尾递归优化。
**注意：递归保存了调用的记录，到最后还是逆着来的。。。
而尾递归不会再倒回去执行一遍，因为只保存了一个调用记录，只返回那些需要用到的参数（例如我们例子中的total），等到执行的最后的条件就可以直接得出结果了。**
* 尾递归优化
用我们最熟悉的斐波那契数列来举个例子。
//递归

        function factorial(n){
            if(n === 1){
                return 1;
            }else{
                return n*factorial(n-1)
            }
        }
  上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 
//尾递归优化

        function factorial(n,total){
            if(n === 1){
                return total;
            }else{
                return factorial(n-1,n*total)
            }
        }

      sum(5,0)
      sum(4,5)
      sum(3,9)
      sum(2,12)
      sum(1,14)
      15

  如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。
在尾递归中，整个计算过程是线性的，调用一次 factorial(n,total)后，会进入下一个栈，相关的数据信息就会跟随插入，而不是放在堆栈上保存，**不会留下执行记录**。当计算最后的值后，直接返回到最上层的  sum(5,0).

  尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。比如上面的例子，阶乘函数 factorial 需要用到一个中间变量 total ，那就把这个中间变量改写成函数的参数。这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？

  方法一：在尾递归函数之外，再提供一个正常形式的函数。

        function tailFactorial(n, total) {
          if (n === 1) return total;
          return tailFactorial(n - 1, n * total);
        }

        function factorial(n) {
          return tailFactorial(n, 1);
        }

        factorial(5) // 120

    函数式编程里面还有一个柯里化的概念，将多个参数——>一个参数

        function currying(fn,n){
            return function(m){
                return fn.call(this,m,n)
            }
        }
        function tailFactorial(n,total){
            if(n === 1){
                return total;
            }else{
                return tailFactorial(n-1,n*total)
            }
        }

        const factorial = currying(tailFactorial,1);

        factorial(5)
  方法二： 采用ES6的函数默认值

        function factorial(n,total = 1){
            if(n === 1){
                return total;
            }else{
                return factorial(n-1,n*total)
            }
        }
        factorial(5)
    注意死循环与堆栈溢出的区别

* 强制使用尾递归优化
在ES6，将迎来尾递归优化，通过他，js代码在解释称机器代码的时候将会向while看起，同时拥有数学表达能力和while的效能。
 在function前面加“#”就不会保留着那些调用的记录，强制使用尾递归优化(浏览器优化，但是本草案没有通过，所以我们还是得自己人工去优化)
#### 十、函子Functor的实现
***
任何具有`map`方法的数据结构，都可以当作函子的实现

       class Functor{
           constructor(val){
               this.val = val;
           }
           map(f){
           return new Functor(f(this.val))
            }
       }
`Functor`是一个函子，它的`map`方法接受函数f作为参数，然后返回一个新的函子，里面包含的值是被f处理过的`（f(this.val)）`。

一般约定，函子的标志就是容器具有`map`方法。该方法将容器里面的每一个值，映射到另一个容器。

看一些代码示例：

       (new Functor(2)).map(function(two){
           return two+2;
       })
       //Functor(4)

       (new Functor('flamethrowers')).map(function(s){
           return s.toUpperCase()
       })
       //Functor('FLAMETHROWERS')
上面的例子说明，函数式编程里面的运算，都是通过函子完成，即运算不直接针对值，而是针对这个值的容器----函子。函子本身具有对外接口（map方法），各种函数就是运算符，通过接口接入容器，引发容器里面的值的变形。
#### 十一、of 方法
***
上面生成一个新对象使用了new,有点对象对象编程的感觉。所以，函子有一个of方法，用来生成新的容器。

下面就用`of `方法替换掉`new`

        Functor.of = function(val){
            return new Functor(val);
        }
上一部分的实例代码可以更改为：

        Functor.of(2).map(function(val){
            return val+2
        })
#### 十一、Maybe函子
***
如果容器内部的值是一个空值（比如null），而外部函数未必有处理空值的机制，如果传入空值，很可能就会出错。

        Functor.of(null).map(function(s){
            return s.toUpperCase();
        })
        //TypeError
上面代码中，函子里面的值是  `null`，结果小写变成大写的时候就出错了。

Maybe 函子就是为了解决这一类问题而设计的。简单说，它的map方法里面设置了空值检查。
//ES6实现

        class Maybe extends Funtor{
            map(f){
                return this.val ? Maybe.of(f(this.val)):Maybe.of(null)
            }
        }
//ES5实现

        var Maybe = function(x) { 
            this.__value = x; 
        } 
        Maybe.of = function(x) { 
            return new Maybe(x); 
        } 
        Maybe.prototype.map = function(f) { 
            return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value)); 
        } 
        Maybe.prototype.isNothing = function() { 
            return (this.__value === null || this.__value === undefined); 
        }

有了 Maybe 函子，处理空值就不会出错了。

        Maybe.of(null).map(function(s){
            return s.toUpperCase();
        })

#### 十二、Either 函子
***
条件运算`if...else`是最常见的运算之一，函数式编程里面，使用 `Either` 函子表达。

`Either` 函子内部有两个值：左值（Left）和右值（Right）。右值是正常情况下使用的值，左值是右值不存在时使用的默认值。

        class Either extends Functor{
            constructor(left,right){
                this.left = left;
                this.right = right;
            }
            map(f){
                return this.right?
                Either.of(this.left,f(this.right)):
                Either.of(f(this.left),this.right);
            }
            //this.right存在就执行Either.of(this.left,f(this.right))
            //不存在就Either.of(f(this.left),this.right)
        }
        Either.of = function(left,right){
            return new Either(left,right);
        }

看一个实际的例子

        var addOne = function(x){
            return x + 1;
        }
        Either.of(5,6).map(addOne);
        //Either(5,7)
        Either.of(1,null).map(addOne);
        //Either(2,null)
实际业务的应用，处理json的时候（可以充当try...catch，有currentUser.address的时候就处理这个返回值，没有的话就处理默认值）

        Either
        .of({address: 'xxx'},currentUser.address)
        .map(updateField);

#### 十三、ap 函子
***
函子里面包含的值，完全可能是函数。我们可以想象这样一种情况，一个函子的值是数值，另一个函子的值是函数。

        function addTwo(x) {
          return x + 2;
        }

        const A = Functor.of(2);
        const B = Functor.of(addTwo)
函子A的内部值是2，函子B的内部值是addTwo这个函数。
如果我们想让函子B内部的函数去使用函子A内部的值，我们就需要用到ap函子。

凡是部署了ap方法的函子，就是 ap 函子。

        class Ap extends Functor {
          ap(F) {
            return Ap.of(this.val(F.val));
            //this.val指的就是那个内部的函数
            //F.val就是那个调用的值
          }
        }

`ap`方法的参数不是函数，而是另一个函子。
  前面的例子可以改写成这样：

        Ap.of(addTwo).ap(Functor.of(2)
ap 函子的意义在于，对于那些多参数的函数，就可以从多个容器之中取值，实现函子的链式操作。
  
  
      function add(x) {
        return function (y) {
        return x + y;
      };
    }

    Ap.of(add).ap(Maybe.of(2)).ap(Maybe.of(3));
    // Ap(5)
上面代码中，函数add是柯里化以后的形式，一共需要两个参数。通过 ap 函子，我们就可以实现从两个容器之中取值。它还有另外一种写法。

        Ap.of(add(2)).ap(Maybe.of(3));
#### 十四、IO 操作
***
真正的程序总要接触肮脏的世界。

        function readLocalStorage(){
            console.log(window.localStorage);
        }

IO与前面的Functor不同的地方在于，他的__value是一个函数，他把一个不纯的操作（输出输入，网络请求）包裹到一个函数内，从而延迟这个操作的执行。
IO装了很多不纯的东西。IO对外面显示是纯的。
IO 负责了调用链积累了很多很多不纯的操作，带来了复杂性和不可维护性。
//  ES5

        import _ from 'loadsh';
        var compose = _.flowRight;

        var IO = function(f){
            this.__value = f;
        }
        //把不纯的函数/操作放在this.__value里面

        IO.of = x => new IO(_=>x);
        //定义IO.of方法。

        IO.prototype.map = function(f){
            return new IO(compose(f,this.__value))
        }


//ES6

        import _ from 'loadsh';
        var compose = _.flowRight;
        class IO extends Mondad{
            map(f){
                return IO.of(compose(f,this.__value))
            }
        }

  compose是组合函数

    const compose = function (f, g) {
      return function (x) {
        return f(g(x));
      };
    }
实际应用中


    var fs = require('fs');
        var readFile = function(filename){
            return new IO(function(){
                return fs.readFileSync('filename','utf-8');
            })
        };
        readFile('./user.txt')
        .flatMap(tail)
        .flatMap(print)

        // 等同于
        readFile('./user.txt')
        .chain(tail)
        .chain(print)
上面代码中，读取文件和打印本身都是不纯的操作，但是readFile和print却是纯函数，因为它们总是返回 IO 函子。
#### 十五、Monad 函子
***
函子是一个容器，可以包含任何值。函子之中再包含一个函子，也是完全合法的。但是，这样就会出现多层嵌套的函子。

Monad 就是一种设计模式，表示将一个运算过程，通过函数拆解成互相连接的多个步骤，只要提供下一步运算所需的函数，整个运算过程就会自动进行下去。

Promise就是一种Monad。

Monad让我们避开了嵌套函数，可以轻松的进行深度嵌套的函数式编程，比如IO和其他异步任务。

     Maybe.of(
      Maybe.of(
        Maybe.of({name: 'Mulburry', number: 8402})
      )
    )
上面这个函子，一共有三个`Maybe`嵌套。如果要取出内部的值，就要连续取三次`this.val`。这当然很不方便，因此就出现了 `Monad` 函子。

`Monad` 函子的作用是，总是返回一个单层的函子。它有一个`flatMap`方法，与`map`方法作用相同，唯一的区别是如果生成了一个嵌套函子，它会取出后者内部的值，保证返回的永远是一个单层的容器，不会出现嵌套的情况。

        class Monad extends Functor {
            join() {
                return this.val;
            }
            flatMap(f) {
                return this.map(f).join();
            }
        }
上面代码中，如果函数`f`返回的是一个函子，那么`this.map(f)`就会生成一个嵌套的函子。所以，`join`方法保证了`flatMap`方法总是返回一个单层的函子。这意味着嵌套的函子会被铺平（flatten）。
#### 流行的几大函数式编程库
***
##### Rxjs(FRP 函数响应式编程)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-dd6d9566c7a923ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
d

对于事件流的处理：r
var clicks = Rx.Observable
      .fromEvent(document,'click')
      . bufferCount(2)
      .subscibe(x => console.log(x))//打印出前两次点击事件
这个也要学会
回头要从头到尾看中文文档。
https://cn.rx.js.org/manual/overview.html
三个基本概念：
![image.png](https://upload-images.jianshu.io/upload_images/7728915-e19bc4b48064782c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
浏览器已经有许多observer
**将点击事件变成流**
响应式编程继承自函数式编程，声明式的，不可变的，没有副作用的是函数式编程的三大护法。其中不可变武功最高深，一直使用面向对象范式编程的我们，习惯了用变量存储和追踪程序的状态。RxJS从函数式编程范式中借鉴了很多东西，比如链式函数调用，惰性求值等。

在函数中与函数作用域之外的一切事物有交互的就产生了副作用，比如读写文件，在控制台打印语句，修改页面元素的css等等。在RxJS中，把副作用问题推给订阅者来解决。


##### underscoreJS
可以通过underscoreJS来学习函数式编程。
https://www.cnblogs.com/WhiteBlade/p/5215434.html

self = window对象
##### lodashJS
一定要学会

PS： monad和IO操作这里还不是很熟。这些函数式编程库也没看。回头看了继续做学习笔记