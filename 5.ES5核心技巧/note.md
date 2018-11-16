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
          //类似的，try...catch(){} with()和eval在同样的位置，他们也不会被回收


   	    function test(){
   		  var a = 1;
   		  return function(){
   			  window.eval("");
   		  }//a 会被回收，将eval的作用域不是闭包，变成了window	
   	    }


4. 箭头函数/this问题

  	    this.a = 30;
   	    var yideng = {
   		a:20,
   		init:function(){
   			console.log(this.a)
   		}
       	}
       yideng.init();//20,因为在yideng 的作用域里面的a=20;


   	    this.a = 30;
            var yideng = {
   		    a:20,
   		    init:function(){
   			    function test1(){
   				    console.log(this.a); 
   			    }
   			    test1();
   		      }
   	      }
   	      yideng.init() //test1()这里指向全局30,这里有一个闭包，指向window


         	this.a = 30;
   	        var yideng = {
   		      a:20,
	   		  init : ()=>{
	   			console.log(this.a);//30,箭头函数会bind this,箭头函数知识会继承父元素的this,会找到父亲的顶级作用域，箭头函数内部的this是词法作用域，由上下文确定。
	   		}
   	    }
        yideng.init()

***

ES5 中声明函数

        function fn(){

        }

等于ES6中的箭头函数

      (参数)=>{

      }

        var sum = function(a,b,c){
            return a+b+c;
         }
等价于

        var sum = (a,b,c) => a+b+c
让我们来看另外一个例子

    {var factory = function() {
    this.a = 'a';
    this.b = 'b';
    this.c = {
      a: 'a+',
      b: function() {
        return this.a
       }
      }
     }

    console.log(new factory().c.b());    //谁调用this,this就指谁，这里明显c.b(),是c调用b,所以是a+
    };

    {
    var factory = function() {
    this.a = 'a';
    this.b = 'b';
    this.c = {
      a: 'a+',
      b: () => {
        return this.a
      }
    }
    }
    console.log(new factory().c.b());//箭头函数中，this指向父元素的同级作用域，也就是说这个b函数是在c里面，c是b的父元素，c的同级作用域中有this.a='a',那么说，在定义的时候我们已经知道this.a返回的是a了
    }
        
更重要的是关于this的绑定
普通函数this的指向是执行时哪个调用了这个函数，this就指向哪里。
箭头函数this的指向是定义时this的指向,就是为了解决运行时this指向不明确的问题.
箭头函数不能作为构造函数。
箭头函数没有arguments对象
箭头函数看上去是匿名函数的一种简写，但实际上，箭头函数和匿名函数有个明显的区别：箭头函数内部的this是词法作用域，由上下文确定。

回顾前面的例子，由于JavaScript函数对this绑定的错误处理，下面的例子无法得到预期结果：

    var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = function () {
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        return fn();
    }
    };

现在，箭头函数完全修复了this的指向，this总是指向词法作用域，也就是**外层调用者obj**：

    var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        return fn();
         }
    };
    obj.getAge(); // 25

5. 原型链，类

        function test(){
            this.a = 20;
        }
        test.prototype.a = 30;
        (new test()).a    //20

        class test{
            a(){
                   console.log(1);
            }
        }
        test.prototype.a = function(){
            console.log(2);
            }
        (new test).a()  //2
类是基于原型链实现的，所以两个a都是在原型链上面的，后面的会把前面的覆盖。

看看京城一灯的这道题，就集合到了我们原型链和this的知识

    this.a = 20;
    var test = {
        a:40,
        init:()=>{
            console.log(this.a);
            function go(){
                this.a = 60;
                console.log(this.a)
            }
            go.prototype.a = 50;
            return go;
        }
    }
    var p = test.init();
    p();
    new(test.init())() //20 60 60 60
简单解释一波： this优先级比prototype高，本身找不到某个属性才会去原型链上面找。
谁调用this,this就指谁
* 箭头函数init()的父级是test,test的a等于20
*  函数go中已经定义了this.a为60，所以this.a=60
*  p也就是函数go，

        function go(){
            this.a = 60;
            console.log(this.a)
        }//60
* new的时候构造函数会执行一遍，原型上的a是等于50，但是他自己本身的还是60
6. 函数变量提升先于变量

 
        (function(){
        var a = 20;
        function a(){}
        console.log(a)
        })()

7. 关于let 

        var i;
        if (true){
            i = 5;
            let i;
        }
        alert(i);  //报错，i is not defined
因为es6中规定了在{  }一个块中，用let来声明一个数的时候。必须先声明，后赋值。不然会报错的。这就是我们所说的暂时性死区。

8. 原型链及相关的面向对象（这个一定要记下来）

        var Car = function(color){
            this.color = color;
        }
        Car.prototype.sale = function(){
        console.log(this.color + '色的车卖了100万')
        }
        var BMW = function(color){
            Car.call(this.color)
        }
        //需要解决的问题有
        //1.拿到父类原型链上面的方法
        //2.不能让构造函数执行两次
        //3.引用的原型链不能按地址引用（不然子类上面的修改会影响到父类，可以使用Object.create来给做个副本）
        //4.修正子类的constructor 
        var __pro = Object.create(Car.prototype);//复制原型链
        __pro.constructor = BMW;
        BMW.prototype = __pro;
        var m = new BMW('red');
        console.log(m)

总结：
![image.png](https://upload-images.jianshu.io/upload_images/7728915-0e69659c24132cbe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


        




