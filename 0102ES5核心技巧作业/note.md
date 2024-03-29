##### 关于函数提升

        alert(a)    1
        a();   2
        var a=3;
        function a(){
            alert(10)
        } 
        alert(a)    3
        a=6;
        a();   4
请写出弹出值，并解释为什么？
由于函数提升，整个式子会变成下面这样
    
      var a；
      function a(){
         alert(10)
      } 
      alert(a)    1
      a();   2
      a=3;
      alert(a);   3    
      a=6;
      a();   4
很明显，会得到下面的结果
    1. f a(){alert(10)}   //变量提升，并且函数优先级高于变量，如果相同命名，变量会被覆盖。
小知识：

        console.log(c)//ƒ c(){console.log('hahha') 
        function c(){
            console.log('hahha')
        }
        var c = 1;

        console.log(c) //ƒ c(){console.log('hahha') 
        var c = 1;
        function c(){
            console.log('hahha')
        }
       

   2. 10  //执行了a(){alert(10)}
    3.  3   //给a赋值了3
    4. a is not a function 此时已经给a赋值了6,a已经不是函数了，所以会弹出错误

##### 关于函数变量提升的一些特殊情况

        function yideng() { 
            console.log(1);
        }
        (function () { 
            if (false) {
                function yideng() {
                    console.log(2);
                }
            }
            yideng();
        })();
        //yideng is not a function
    在早期的浏览器中，弹出来的结果应该是2,（因为变量提升，整个         function yideng() { }会被提升到整个函数作用域的顶端）但是如果弹出来是2的话，我们写的if语句就完全没有意义了。后来浏览器为了修正这个错误，像这种情况下面的函数提升就只是 `var yideng`提升到函数作用域的顶端，本题中false所以没进入函数体，所以yideng()就会报错yideng is not a function。而不是像第一题那样，整个函数体都提到前面。
据说除了if，好像while，switch，for也一样。
补充小知识：
  
    
        if(false){
            var a = 1;
        }
        console.log(a)//undefined

#####关于this
写出以下输出值，解释为什么？


    this.a = 20; 
    var test = {
        a: 40,
        init:()=> {
            console.log(this.a);  
            function go() {
                console.log(this.a);
            }
            go.prototype.a = 50; 
            return go;
            }
        };
        new(test.init())();   //20   50 
箭头函数的this绑定父级的词法作用域，所以他的this.a固定了是20。
go本身没有a 这个属性，所以new出来的对象也没有这个属性，会到原型链上面去找。所以是50。

      this.a = 20; 
      var test = {
        a: 40,
        init:()=> {
            console.log(this.a); 
            function go() {
               this.a = 60;
                console.log(this.a);
            }
            go.prototype.a = 50; 
            return go;
            }
        };
        var p = test.init();  //20 
        p();  //  60 
        new(test.init())();   //  60，60
刚开始我以为输出的结果会是20 60 20 60
var p =  test.init();  此时test.init()会执行一遍。此时的箭头函数中的this绑定了最外层的this（test父级作用域的this），也就是this.a = 20
 p() 此时相当于执行go()，**注意：这个时候是var p = test.init（）,所以执行p()时的this是指向windows，也就是我们现在看到的最外层的this.a = 20的那个this，**此时会执行this.a = 60，将windows的this.a 更改成60,执行之后打印出来的this.a=60.
new(test.init())()：test.init()会取到已经绑定了的父级词法作用域的this，不过此时的this.a已经被改为60,所以打印出来60。继续执行，打印出60。

思考一下，如果是下面这种情况的话，会打印出来什么呢？

![image.png](https://upload-images.jianshu.io/upload_images/7728915-43bfc524daafa451.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

执行的时候20
**因为这里是var 不是this.a**

另外一个小知识：

        function test(){
            console.log(this)
        }
        var obj = {
            f:test
        }
        (obj.f)()  //Cannot read property 'f' of undefined
？？？？？什么鬼？？
原来是因为没有加；在浏览器看来       
 var obj = {f:test}(obj.f)() 是这样连在一起的。那肯定会报错啊！

加上分号之后，我们再来看一下这段代码运行的结果是怎么样的。

        function test(){
            console.log(this)
        }
        var obj = {
            f:test
        };
        (obj.f)()//{f: ƒ}
很明显，指向了obj这个对象，因为是obj调用了test()。
那如果我们再这样改一下：


        function test(){
            console.log(this)
        }
        var obj = {
            f:test
        };
        (false || obj.f)()
猜猜结果是什么？是window
？？？？？这又是什么鬼？？？
短路语句的结果不也是obj.f，运算的结果应该也是obj才对啊。
但是**()里面是计算，所以里面应该是表达式，也就是说里面相当于var xx = obj.f，然后xx(),此时this肯定是指向全局变量window**

#####关于闭包块级作用域
请写出如下点击的输出值，并用三种办法正确输出li里面的数字。


    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
    </ul>
    <script type="text/javascript">
        var list_li = document.getElementsByTagName("li"); 
        for (var i = 0; i < list_li.length; i++) {
            list_li[i].onclick = function() { console.log(i);
            }
        }
    </script>
真的是很经典的一道题啊！！！！大家可以闭着眼睛说不管点击哪个li都只会输出6。（跟Js的单线程和异步队列有关）
解决方法有三个：
* ES6的let

        for (let i = 0; i < list_li.length; i++) {
            list_li[i].onclick = function() { 
                console.log(i+1);
            }
        }
关于let 可以看看暂时性死区这个知识点。
* 闭包，立即执行函数

      for(var i = 0; i < list_li.length; i++){
        (function(i){
            list_li[i].onclick = function(){
                console.log(i+1)
            }
        })(i)
      }
闭包保存这个变量。
* 最后一种方法是佳哥说出来的时候恍然大悟，这才是最in的解决方案啊我靠。这道题考的是this啊，不是闭包也不是作用域。。。

        for (var  i = 0; i < list_li.length; i++) {
            list_li[i].onclick = function() { 
                console.log(this.innerHTML);
            }
        }
#####按地址传递和按值传递
写出输出值，并解释为什么

        function test(m){
            m = {
                v:5
            };
        }
        var m = {
            k:30
        };
        test(m);  
        alert(m.v); //undefined
test函数是把m进行重写了，是重写，所以就找不到m.v了。

在我看来，函数传参需要分两种情况，基本类型复制后俩个变量完全独立，之后任何一方改变都不会影响另一方；引用类型复制的是引用，之后的任何一方改变都会映射到另一方。

**我们可以把ECMAScript函数的参数想象成局部变量。在向参数传递基本类型的值时，被传递的值被复制给一个局部变量（即命名参数，或者用ECMAScript的概念来说，就是arguments对象中的一个元素）。在向参数传递引用类型时，会把这个值在内存中的地址（指针）复制给一个局部变量，因此这个局部变量的变化会反映在函数的外部。**

拿一个最简单的例子来讲：

    function test(a){
        a = a * 10
    }
    var a = 10;
    test(a);

分析一下，函数test()括号里面的a是函数arguments对象中的一个元素，只是将外面的a复制了一份值给test里面的a,对arguments里面的a进行操作，与我们在外面定义的a，互不干扰。对上面的代码进行更改：

    function test(num){
        num = num * 10;
    }
    var a = 10;
    test(a);//10

所以上面那道题都是a有点迷惑人的嫌疑，下面的代码实现的效果和上面是一样的。外面的a将自己的值复制给test中的arguments中的num就没自己什么事了。

如果要把内部操作的结果给外面，也很简单，用return就好了。

    function test(num){
        num = num * 10;
        return num;
    }
    var a = 10;
    var b = test(a);
    console.log(a);//10
    console.log(b);//100

**但是像参数传递引用类型的数值时，会把这个值在内存中的地址（指针）复制给函数的参数，因此这个局部变量的变化会反映在函数的外部。**
看下面的例子就能很明显的看出引用传递的特点了。

        var a = {
            num : 1
        };
        var b = a;
        b.num = 2;
        console.log('a',a); //{num:2}
        console.log('b',b); //{num:2}

很明显，这是按引用传递，改动b就相当于改动a.

        var a = {
            num : 1
        };
        var b = a;
        b = {};  
        b.num = 3;
        console.log('a',a); //{num:1}
        console.log('b',b); //{num:3}
此时 b = {}开辟了新的内存地址。

比较一下下面两段代码的不同：
示例一：

    function test(n){
        n = {
            k : 2
        }
    }

    var m = {
        v : 100
    }
    test(m);
    console.log(m.v);//100
    console.log(m.k);//undefined

示例二：

    function test(n){
        n.k = 20;
    }

    var m = {
        v : 100
    }
    test(m);
    console.log(m.v);//100
    console.log(m.k);//20

示例一：我们注意到test中对参数进行了重写，    
    n = { k : 2 }相当于 n = {},n.k = 2;
    也就是说本来是test中的参数n和外面的m本来是指向同一个地址的，但是，n = { k : 2 }重写了，指向了另外一个新的地址，并在这个新的地址这里给k赋值了。


示例二： n和m指向同一个地址，并且n只是添加属性并没有重写，所以两个属性都是存在的。



      


