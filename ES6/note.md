1. babel转码
* 在项目安装babel-cli

        npm install --global babel-cli
* babel-cli 的基本用法

        # 转码结果输出到标准输出
        $ babel example.js

        # 转码结果写入一个文件
        # --out-file 或 -o 参数指定输出文件
        $ babel example.js --out-file compiled.js
        # 或者
        $ babel example.js -o compiled.js

* 建立Babel 的配置文件.babelrc，存放在项目的根目录下。使用 Babel 的第一步，就是配置这个文件。
**以下所有 Babel 工具和模块的使用，都必须先写好.babelrc**
该文件用来设置转码规则和插件，基本格式如下。

      {
      "presets": [],
      "plugins": []
      }

先利用npm进行安装

        # 最新转码规则
        $ npm install --save-dev babel-preset-latest

        # react 转码规则
        $ npm install --save-dev babel-preset-react

        # 不同阶段语法提案的转码规则（共有4个阶段），选装一个
        $ npm install --save-dev babel-preset-stage-0
        $ npm install --save-dev babel-preset-stage-1
        $ npm install --save-dev babel-preset-stage-2
        $ npm install --save-dev babel-preset-stage-3
然后在presets中对编码规则设置：
      "latest",
      "react",
      "stage-2"
*    执行转码
        
        babel index.js -o test.js
我们原本的index.js文件是下面这个样子的：

          let a = 1;
          console.log('aagagagag');
          class f{};
输出的test.js代码如下：

        'use strict';

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        var a = 1;
        console.log('aagagagag');

        var f = function f() {
          _classCallCheck(this, f);
        };

        ;

   上面这段代码好好感受一下~当this不在对应的构造器的时候是会报错的
*   上面代码是在全局环境下，进行 Babel 转码。这意味着，如果项目要运行，全局环境必须有 Babel，也就是说项目产生了对环境的依赖。另一方面，这样做也无法支持不同项目使用不同版本的 Babel。
解决方法是：
一个解决办法是将babel-cli安装在项目之中。

        $ npm install --save-dev babel-cli
然后，改写package.json。

        {
            // ...
          "devDependencies": {
            "babel-cli": "^6.0.0"
          },
          "scripts": {
            "build": "babel src -d lib"
          },
        }
转码的时候，就执行下面的命令。

        $ npm run build

* 还有shim和polyfill

  shim是一个库，将新的API引入到旧的环境中,而且仅靠旧环境中已有的手段实现

  一个polyfill就是一个用在浏览器API上的shim.我们通常的做法是先检查当前浏览器是否支持某个API, 如果不支持的话就加载对应的polyfill.然后新旧浏览器就都可以使用这个API了.


2. 需要掌握的语法

##### const,let 
推荐使用const
因为
1. const可以提醒大家，不能被改变
2. const比较符合函数式编程
3. 与let 本质的区别，在于编译器内部的处理机制也不同
js编译器有对const进行优化。

#####对象解构
http://es6.ruanyifeng.com/#docs/destructuring
    
        function test(){
            return {
                a:"Hello",
                b:"World",
                age:"100"
            }
        }
        const result = test();
        const {a,age,b} = result;
        console.log(a); //Hello
        console.log(b); //World"
        console.log(age); //100
**对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。**

        let {zty1,zty2}={
            zty1:"aaa",
            zty2:"bbb"
        }
        console.log(zty1);
        console.log(zty2);
其实对象的解构赋值其实是下面这种形式的简写。

        let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

        let { foo: baz } = { foo: "aaa", bar: "bbb" };
        baz // "aaa"
        foo // error: foo is not defined
`baz`才是要被赋值的变量而不是`foo`
如果解构不成功，变量的值就等于`undefined`。
如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。
//下面的将会报错

        let [foo] = 1;
        let [foo] = false;
        let [foo] = NaN;
        let [foo] = undefined;
        let [foo] = null;
        let [foo] = {};
  对于 Set 结构，也可以使用数组的解构赋值。

       let [j,k,l] = new Set(['a','a','b','c']);
       console.log(j,k,l)//a,b,c
**解构赋值允许指定默认值。**

**应用**
1.  交换变量的值

        let x = 1;
        let y = 2;
        [x,y] = [y,x];
        console.log('x',x);  //x,2
        console.log('y',y);  //y,1
上面代码交换变量 `x`和`y`的值，这样的写法不仅简洁，而且易读，语义非常清晰。

2. 从函数返回多个值
函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

        function test(){
            return [1,2,3];
        }
        let [a,b,c] = test();
        console.log(a,b,c);// 1 2 3
 3. 提取 JSON 数据
解构赋值对提取 JSON 对象中的数据，尤其有用。

        let jsonData = {
            'age': 16,
            'name': 'jack',
            'data': [1,2]
        }

        let {age,name,data:number} = jsonData;
        console.log(age);
        console.log(name);
        console.log(number);

4. 遍历 Map 结构const map = new Map();

        map.set('first', 'hello');
        map.set('second', 'world');

        for (let [key, value] of map) {
          console.log(key + " is " + value);
        }
        // first is hello
        // second is world
    如果只想获取键名，或者只想获取键值，可以写成下面这样。


      // 获取键值
      for (let [,value] of map) {
        // ...
    }
##### 模板字符串

        var a = 'hello';
        var b = "world";
        var c = `我最爱的就是${a}${b}`
        var d = test`我最爱的就是${a}${b}`;
        function test(str,...value){
            console.log(str);
            console.log(value);
        }
value是模板字符串里面的值。

##### 数组对象

        const arr = "888";
        const arr1 = ['花','大树',...arr];
        console.log(arr1); //["花", "大树", "8", "8", "8"]

**...扩展运算符**
构造字面量数组时使用展开语法会方便很多。

* 将已有数组元素变成新数组的一部分

        var parts = ['shoulders', 'knees']; 
        var lyrics = ['head', ...parts, 'and', 'toes']; 
        // ["head", "shoulders", "knees", "and", "toes"]

* 数组拷贝（浅拷贝）

        var arr = [1,2,3];
        var arr2 = [...arr];
        arr2.push(4);
        console.log(arr); //[ 1, 2, 3 ]
        console.log(arr2); //[ 1, 2, 3 , 4]

* 连接数组
如果没有扩展运算符就用concat

        const arr1 = [1,2,3];
        const arr2 = [4,5,6];
        const arr3 = [...arr1,...arr2];
        console.log(arr3); //[1, 2, 3, 4, 5, 6]
Array.unshift() 方法常用于在数组的开头插入新元素/数组.  不使用展开语法, 示例如下:

        var arr1 = [0, 1, 2];
        arr2 = [3, 4, 5];
        // 将 arr2 中的元素插入到 arr1 的开头
        Array.prototype.unshift.apply(arr1, arr2) // arr1 现在是 [3, 4, 5, 0, 1, 2]

如果是用扩展运算符，我们就可以

      var arr1 = [0, 1, 2];
      var arr2 = [3, 4, 5];
      arr1 = [...arr2, ...arr1];
但是需要注意的是，我们用展开语法创建了一个新的 arr1 数组，而unshift是在旧的arr1数组。

**Object.is()**

        console.log(NaN === NaN);//false
        console.log(Object.is(NaN,NaN)); //true

**跟原型有关的一些操作**
Object.setPrototypeOf()方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  `null`。
但是应该避免修改。应该使用 [`Object.create()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create "Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请打开浏览器控制台以查看运行结果。）")来创建带有你想要的`[[Prototype]]`的新对象。

        const eat = {
            getEat(){
                console.log('吃');
            }
        }
        const drink = {
            getDrink(){
                console.log('喝')
            }
        }

        let sunday = Object.create(eat);
        Object.getPrototypeOf(sunday); //{getEat:f()}
        //Object.getPrototypeOf返回指定对象的原型
        sunday.getEat()//吃
        Object.setPrototypeOf(sunday,drink);
        sunday.getEat()//sunday.getEat() is not a function
        sunday.getDrink();//喝

##### 函数
箭头函数
作用：
1. 让代码更加简洁
2. 绑定了父级的作用域
让我们看看这个困扰了我很久的代码

        const luke = {
            id: 2,
            say: function(){
                setTimeout(function(){
                    console.log(this.id)
                },50)
            },
            sayWithThat: function(){
                let that = this
                setTimeout(function(){
                    console.log(that.id)
                },500)
            },
            sayWithArrow: function(){
                setTimeout(() =>{
                    console.log(this.id)
                },1000)
            },
            sayWithGlobalArrow: ()=>{
                setTimeout(()=>{
                    console.log(this.id)
                },2000)
            }
        }
        luke.say() //undefined 因为setTimeout运行时this指向的是window
        luke.sayWithThat() //2 保存了定义时的that
        luke.sayWithArrow() //2  箭头函数指向的是父级的作用域，也就是指向luke
        luke.sayWithGlobalArrow() //undefined  注意这里是两个箭头函数
刚开始遇到了一个问题：

        sayWIthArrow: ()=>{
            setTimeout(function(){
                console.log(this.id)
            })
        }
本来预想的是2，但是输出结果却是undefined，为啥？？？

因为我把方法写在了对象里，而对象的括号是不能封闭作用域的。所以此时的this还是指向全局对象。
所以，通过以上的错误可以提醒我们，**最好不要用箭头函数作为对象的方法。**

然后我写了几个相关函数测试一下：当对象的函数用箭头函数的话会怎么样？

        //对象的函数最好不要用箭头函数
        let person = {
            a:2,
            say:()=>{
                console.log(this.a)
            },
            sayhh:function(){
                console.log(this.a)
            }
        }
        person.say() //undefined
        person.sayhh() //2
可以看到，对象中的方法如果是箭头函数的话，他的作用域就会变成全局的。不然就是person。


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

    console.log(new factory().c.b());    //a+
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
    console.log(new factory().c.b());//a
    }
还有这个例子，也让我困扰了很久，先看第一种情况，因为是c调用的b，所以this指向c，取得的a值就是a+
第二种情况，注意啊！this.c是个对象啊！{ }是不能封闭作用域的，函数才可以，所以this还是会指向外层的factory这个函数，所以是a


先让我们看看MDN上面的一个示例吧！

    //创建一个含有bar方法的obj对象
    //bar返回一个函数
    //这个函数返回this
    //这个this永久绑定到了它外层函数的this，也就是obj
    let obj = {
        bar:function(){
            var x = (()=> this);
        return x;
        }
    }

    //作为obj对象的一个方法来调用bar,把它的this绑定到obj上
    var fn = obj.bar();
    //如果是非箭头函数的话，按照fn()这样再去调用的话this是指向全局的
    //但是箭头函数早已经绑定了obj
    console.log(fn() === obj);

#####Generator 函数
形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）

       let zty = function*(){
           yield "哈哈";
           yield "呵呵";
       }
       const result = zty();
       console.log(result.next());
       //{value: "哈哈", done: false}
       console.log(result.next());
       //{value: "呵呵", done: false}
       console.log(result.next());
      //{value: undefined, done: true}
Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。
**ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。**

#####Set和map
Set是一个构造函数，可以去遍历
Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成 Set 数据结构。

![image.png](https://upload-images.jianshu.io/upload_images/7728915-5975c77c3c29683e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

一定要在日常开发中好好运用！！！！



#####module
![image.png](https://upload-images.jianshu.io/upload_images/7728915-49d0523515bec2b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
上面是比较好的一种表现形式
system.js

#####async和await
`async` 函数是什么？一句话，它就是 Generator 函数的语法糖。async函数就是将 Generator 函数的星号（*）替换成 `async`，将yield替换成`await`。而且，`async `函数的执行，与普通函数一模一样，只要一行,就能得到最后结果。而Generator 函数，需要调用next方法，或者用co模块，才能真正执行，得到最后结果。
而且`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。
 `async`函数的返回值是` Promise `对象，可以用then指定下一步操作。

       async function getPriceByName(name){
           const symbol = await getSymbol(name);
           const Price = await getPrice(symbol);
           return Price; 
       }

       getPriceByName('taobao').then(res=>{
           console.log(res);
       })
上面代码是一个获取股票报价的函数，**函数前面的async关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。**

       function timeout(ms){
           return new Promise((resolve)=>{
               setTimeout(resolve,ms)
           })
       }

       async function time(value,mm){
           const result = await timeout(mm);
           console.log(value);
       }

       time('解决',1000)
上面代码指定 50 毫秒以后，输出hello world。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-26f6acc81449cc3d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#####修饰器
修饰器是一个对类进行处理的函数。修饰器函数的第一个参数，就是所要修饰的目标类。

    function testable(target) {
      // ...
    }
testable函数的参数target，就是会被修饰的类。
React 与 Redux 库的源代码有用到这个东西。
[core-decorators.js](https://github.com/jayphelps/core-decorators.js)是一个第三方模块，提供了几个常见的修饰器，通过它可以更好地理解修饰器。
（1）@autobind
autobind修饰器使得方法中的this对象，绑定原始对象。
（2）@readonly
readonly修饰器使得属性或方法不可写。
（3）@override
override修饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。



#####Symbol(惟一的）
Symbol 值可以显式转为字符串。Symbol 值不能与其他类型的值进行运算，会报错!
    
    let sym = Symbol('My symbol');

    String(sym) // 'Symbol(My symbol)'
    sym.toString() // 'Symbol(My symbol)'

s1和s2是两个 Symbol 值。如果不加参数，它们在控制台的输出都是Symbol()，不利于区分。有了参数以后，就等于为它们加上了描述，输出的时候就能够分清，到底是哪一个值。
        // 没有参数的情况
        let s1 = Symbol();
        let s2 = Symbol();

        s1 === s2 // false

        // 有参数的情况
        let s1 = Symbol('foo');
        let s2 = Symbol('foo');

        s1 === s2 // false
实例：消除魔术字符串
魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的**某一个具体的字符串或者数值**。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

    function getArea(shape, options) {
      let area = 0;

      switch (shape) {
        case 'Triangle': // 魔术字符串
          area = .5 * options.width * options.height;
          break;
        /* ... more code ... */
      }

      return area;
    }

    getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
上面代码中，字符串Triangle就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。
常用的消除魔术字符串的方法，**就是把它写成一个变量**。

    const shapeType = {
      triangle: 'Triangle'
    };

    function getArea(shape, options) {
      let area = 0;
      switch (shape) {
        case shapeType.triangle:
          area = .5 * options.width * options.height;
          break;
      }
      return area;
    }

    getArea(shapeType.triangle, { width: 100, height: 100 });
上面代码中，我们把Triangle写成shapeType对象的triangle属性，这样就消除了强耦合。

如果仔细分析，可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

    const shapeType = {
      triangle: Symbol()
    };

##### Iterator遍历器（迭代器）
下面代码定义了一个遍历器：

    //生成器函数
    function makeIterator(arr){
        let nextIndex = 0

        //return一个迭代器对象
        return{
            next:()=>{
                if(nextIndex < arr.length){
                    return{value: arr[nextIndex++],done:false}
                }else{
                    return {done:true}
                }
            }
        }
    }

    const it = makeIterator(['吃饭','睡觉','打豆豆'])
    console.log(1,it.next().value);  // 1 吃饭
    console.log(2,it.next().value);  // 2 睡觉
    console.log(3,it.next().value);  // 3 打豆豆
    console.log(4,it.next().value);  // 4 undefined
请记住这个简陋的遍历器。
**Iterator遍历器和Generator函数的关系是很密切的**

##### Generator 函数（生成器）
形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）
看看跟上面有点类似的例子：

    //generator
    function* makeIterator(arr){
        for(let i = 0; i < arr.length; i++){
            yield arr[i]
        }
    }

    const gen =  makeIterator(['吃饭','睡觉','打豆豆'])
    console.log(1,gen.next().value);  // 1 吃饭
    console.log(2,gen.next().value);  // 2 睡觉
    console.log(3,gen.next().value);  // 3 打豆豆
    console.log(4,gen.next().done);  // 4 true  
与上面例子比较之后，我们发现了什么
**总结：生成器就是为更方便使用迭代器，它的特点就是简化掉迭代器（Interator）的组建过程（创建过程）**

再看看另一个例子

       let zty = function*(){
           yield "哈哈";
           yield "呵呵";
       }
       const result = zty();
       console.log(result.next());
       //{value: "哈哈", done: false}
       console.log(result.next());
       //{value: "呵呵", done: false}
       console.log(result.next());
      //{value: undefined, done: true}
Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。
**ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。**

##### co库执行Promise和generator function
npm install co -D

    const co = require('co');
    const fetch = require('node-fetch')

    co(function *(){
        const res = yield fetch('https://api.douban.com/v2/movie/1291843')
        const movie = yield res.json()
        const summary = movie.summary
        
        console.log(summary)
    })

用同步的方式来执行异步的过程。
**co让genrator实现了自动执行，不需要手动调用next,而且实现的效果就是当第一句代码执行完的时候才会执行第二句，当第二句执行完的时候才能执行第三句。**
![image.png](https://upload-images.jianshu.io/upload_images/7728915-c51a71183ac93db6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    //自己来实现一个简易的co
    function run(generator){
        //调用generator来生成一个迭代器
        const iterator = generator()
        //执行第一个yield后面的内容
        const it = iterator.next()
        //fetch得到了一个promise
        const promise = it.value

        //将取得的data传入promise中
        //继续next
        promise.then(data => {
            const it2 = iterator.next(data)
            const promise2 = it2.value

            promise2.then(data2 => {
                iterator.next(data2)
            })

        })
    }

    run(function *(){
        const res = yield fetch('https://api.douban.com/v2/movie/1291843')
        const movie = yield res.json()
        const summary = movie.summary
        
        console.log(summary)
    })
打印出来的结果一样。
当然，你可以去看看co的源代码！！
小tips：co库中yield后面不能跟着字符串或者布尔值
只能跟着function, promise, generator, array, or object



