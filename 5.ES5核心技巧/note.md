1. 立即调用函数表达式（IIFE）
特点一：
当函数变成立即执行的函数表达式时（就类似于我们说的块级作用域），表达式中的变量不能从外部访问。
特点二：
将 IIFE 分配给一个变量，不是存储 IIFE 本身，而是存储 IIFE 执行后返回的结果。

        (function(){alert(1)})()
函数声明是不能直接在后面加括号这样的，function(){}()这个样子，浏览器解析完function(){}发现后面还有括号，会判断是错误的，所以可以在function前面加上+ - ~这些让他们变成函数表达式（跟在外面括一个括号的原理是一样的），然后立即执行。
看看下面的代码及其执行结果：

    +function(){
        console.log(a);//ƒ a(){console.log(2);}
        a();//2
        var a = function(){
            console.log(1);
        }
        function a(){
            console.log(2);
        }
        console.log(a);//ƒ (){console.log(1);}
        a();//1
        var c=d=a
    }();
    console.log(d);//ƒ (){console.log(1);}
    console.log(c);//3

2.在es5中没有函数级作用域的概念，也就是说，函数里面定义的局部变量只在函数内部有用，例如

        function test(){
             var a;
             if(false){a = 1}
            alert(a);        
        }
        test();//undefined
        alert(a);//Uncaught ReferenceError: a is not defined
es6中就有块级作用域的概念，在一个块中{    }我们可以定义的一些变量我们可以配合let来使用。

           {
              let b = 2;
          }
            console.log(b);  //Uncaught ReferenceError: b is not defined
没和let一起使用像这个就没啥用处了

          {
             var c = 3;
          }
           console.log(c) //3
**但是如果需要兼容很老旧的浏览器，怎么实现let这样的效果呢？**

        {
          try{
            throw 1;
          }catch(a){
            console.log(a);  //1
            }
        }
    console.log(a); //Uncaught ReferenceError: a is not defined
使用with也可以形成块级作用域，但是可能会存在一些问题

        var tency = {a:1};
            with(tency){
         var b = 2;  //如果with(tency)的情况下，要对tency里面没有的变量进行赋值，相当于创建了一个新的全局变量，而不是在tency这个作用域里面创建的
    }
    console.log(tency.b);   //undefined
    console.log(b)  //2

**提升的时候，函数的优先级要高于变量的优先级**

        (function(){
        console.log(a);
        var a = 1;
        function a(){
            console.log(a);
        }
    })() //ƒ a(){console.log(a);}
3. 关于闭包

        function test(){
          var a = 1;
          return function(){

            }//a会被回收，在外面没有被引用
        }

        function test(){
          var a = 1;
          return function(){
            eval("");
          }//a 不会被回收，因为不确定会不会用到a,类似的还有with和try catch
        }

        function test(){
          var a = 1;
          return function(){
              window.eval("");
          }//a 会被回收，将eval的作用域不是闭包，变成了window 
      }

### 关于原型和原型链
对象是函数创建的，而函数却又是一种对象？
 Function.prototype指向的对象，它的__proto__是不是也指向Object.prototype？

答案是肯定的。因为Function.prototype指向的对象也是一个普通的被Object创建的对象，所以也遵循基本的规则。
   var a = { } //一般推荐这么写
   
    var a = new Object( )  //等于上式

    var b = [ ] //一般推荐这么写

    var b = new Array( ) //等于上式

    function Foo(){

    }//一般推荐这么写

    var Foo = new Function() //等于上式
也就是说（对象都是通过函数来创建的）
* Foo()的构造函数是Function
* 对象a的构造函数是Object
* 数组b的构造函数是Array


    
    
重点规则：
+ 所有的引用类型（函数，对象，数组）都是拥有对象特性，可以随意扩展属性（null除外）。

+ 所有的引用类型都有一个\_proto_属性（也称为隐式属性），其属性值是一个普通对象。



+ 所有的函数都有一个prototype属性（也称为显式属性），其属性值也是一个普通对象。（默认的只有一个叫做constructor的属性，指向这个函数本身。如下图）
![image.png](https://upload-images.jianshu.io/upload_images/7728915-724f8d3762437719.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
例如，我们的Object（这是一个构造函数来着，所以它也是函数）的prototype就拥有许多默认的方法，如下：
![image.png](https://upload-images.jianshu.io/upload_images/7728915-3ad868616f8208f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



+ **所有的应用类型的\_proto_属性相当于它的构造函数的prototype属性**
                
        var obj = {};
        console.log(obj._proto_===Object.prototype)   //true

上面是一条很重要的性质。

        
        function Foo(name){
          this.name=name;
        }
        var f = new Foo('zhangsan');
        f.printf = function(){
          alert(this.name);
        }
        f.toString();   //这个要去f._proto_.proto里面找
        
看下图，
1. 我们要找到f.toString()，首先在f中找，但是f中我们只定义了一个printf的属性，那么我们只能去f的隐式原型里面找有没有这个属性，
2. 同时，Foo是f的构造函数，所以f._proto_===Foo.prototype;
这里的f._proto_和Foo.prototype都是对象。
Foo.prototype里面也没有这个属性；
3. 继续从Foo的隐式原型里面查找；
同时，Foo.prototype._proto_===Object.prototype;
4. 最后注意，js中规定：Object.prototype=null;为了避免死循环。
![原型链.png](http://upload-images.jianshu.io/upload_images/7728915-188c1b2fc607cf65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


相关面试题：
1. 如何准确判断一个变量是数组类型？
先排除typeof；为什么？
![typeof.png](http://upload-images.jianshu.io/upload_images/7728915-302ab9d0baafb783.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们应该利用instanceof，用于判断引用类型属于哪个构造函数，通过原型链查找
一层一层向上查找，看arr的构造函数是不是Array。
![instanceof.png](http://upload-images.jianshu.io/upload_images/7728915-959fdfa6b881b09e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
但是instanceof在某些IE版本中不正确，我们也可以用下面这种方法：
####语法
********
Array.isArray(object) 
********
![判断数组.png](https://upload-images.jianshu.io/upload_images/7728915-d28a3ade32c727fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 写一个原型链继承的例子
script代码

     *   便于理解的例子

        function Animal(){   //构造函数首字母一般要用大写
            this.eat = function(){
                alert("eat");
            }
          }

          function Dog(){
            this.bark = function(){
               alert("bark");
            }
        }
          Dog.prototype = new Animal(); //Dog的显式原型就是Animal new出来的一个对象，所以Dog里面的显式原型也含有eat这个属性
          var hashiqi = new Dog();
          hashiqi.bark();   //页面会弹出“bark”的警告框   
最后hasiqi也能调用bark()这个方法。
hashiqi._proto_ ===Dog.prototype
 * 另外一个比较贴近实战的例子
关于封装DOM查询的例子

         function Elem(id){
          this.elem = document.getElementById(id);    //Elem是一个构造函数，
        //将获取到的整个element（对象）都放在this的elem属性里面，便于DOM操作
         }

        Elem.prototype.html = function(val){
        var elem = this.elem;    //将this.elem放在elem变量（在这里是一个对象）里面
        if(val){ 
          elem.innerHTML = val;   //将va;赋值给这个变量的innerHTML
          return this; //链式操作
        }else{
        return elem.innerHTML;
                }
         }
        Elem.prototype.on = function(type,fn){
        var elem = this.elem;   //相同的，将this.elem放在elem变量（在这里是一个对象）里面
        elem.addEventListener(type,fn);  //向元素添加事件的方法，http://www.runoob.com/jsref/met-element-addeventlistener.html
        }

         var div1= new Elem('div1');  //这里的div1要就是你想要取的元素的id了
         div1.html(''); //div1也继承了Elem的原型的属性。这里是可以调用的，当然这里也可以用div.html('helloworld')
         div1.on('click',function(){
            alert("我被点击了"); //点击对应Id区域，就会有警告框弹出来
         })
3. 按照存储方式区分js变量类型
    1. 值变量类型

              var a = 10;
              var b = a;
              a = 11;
              console.log(b) //10
不同的变量的信息存放在不同的内存块中，对其中一个进行操作，另外一个不受影响

    2. 引用变量类型

            var obj1 = {x:100}
            var obj2 = new obj1;
            obj1.x = 101;
            console.log(obj2.x) //101
类似于指针，引用变量类型时，obj1和obj2都指向同一个内存块，当obj1的x属性改变，obj2的x属性也在同一个地方，所以都会改变。

4. 简述一下new一个对象的过程
    前提：有一个构造函数
    1. 创建一个对象
    2. this指向这个新对象
    3. 对this赋值
    4. 返回this

            function Person(name,age){
                this.name = name;
                this.age = age;
            }
            var p = new Person('zhangsan',19);
            console.log(p.name);   //zhangsan
            console.log(p.age);   //19