https://www.zhangxinxu.com/wordpress/2012/01/introducing-ecmascript-5-1/
上面为翻译文档。

#####JSON
ES5提供一个全局的JSON对象，用来序列化(JSON.stringify)和反序列化(JSON.parse)对象为JSON格式。

如果是老旧的浏览器，推荐使用[json2.js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js)来实现同样的功能。

JSON.parse接受文本(JSON格式)并转换成一个ECMAScript值。该可选的reviver参数是有带有key和value两个参数的函数，其作用于结果——让过滤和转换返回值成为可能。

> JSON.parse(text [, reviver])


    var result = JSON.parse('{"a": 1, "b": "2"}');
    console.log(result)
    //{a: 1, b: "2"}

如果我们想对这些解析的值做某些筛选，那么就可以利用reviver来进行操作。

       var result = JSON.parse('{"a": 1, "b": "2"}');
       result.b// "2"


        var result = JSON.parse('{"a": 1, "b": "2"}', function(key, value){
            if (typeof value == 'string'){
              return parseInt(value);
            } else {
            return value; 
            }
        })

       result.b//2

JSON.stringify允许作者接受一个ECMAScript值然后转换成JSON格式的**字符串**。(在我们传递向后端传递参数的时候经常用到） 在其最简单的形式中，JSON.stringify接受一个值**返回一个字符串**
>JSON.stringify(value [, replacer [, space]])

     var result = JSON.stringify({a:99,b:11});
     result//‘{"a":99,"b":11}’

space表明了作缩进的JSON字符串或字符串每个水平上缩进的空格数。

#####添加对象
[`Object.assign()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign "Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。")

通过复制一个或多个对象来创建一个新的对象。

    var source = {a : 1};
    var result = Object.assign({},source);
    console.log(result) //  {a: 1}

    var source = {a : 1};
    var result = Object.assign({b : 3,a : 7},source);
    console.log(result)//   {b: 3, a: 1}

针对深拷贝，需要使用其他方法，因为 Object.assign()拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。

    let obj1 = {a:1,b:{c:0}};
    let obj2 = Object.assign({},obj1);
    console.log(JSON.stringify(obj2)); // {"a":1,"b":{"c":0}}

    obj1.a = 2;
    console.log(JSON.stringify(obj1)); //{"a":2,"b":{"c":0}}
    console.log(JSON.stringify(obj2)); //{"a":1,"b":{"c":0}}

    obj2.a = 5;
    console.log(JSON.stringify(obj1)); //{"a":2,"b":{"c":0}}
    console.log(JSON.stringify(obj2)); //{"a":5,"b":{"c":0}}

    obj1.b.c = 3;
    console.log(JSON.stringify(obj1)); //{"a":2,"b":{"c":3}}
    console.log(JSON.stringify(obj2)); //{"a":5,"b":{"c":3}}

    //deep clone

    let obj1 = {a:1,b:{c:1}}
    let obj3 = JSON.parse(JSON.stringify(obj1))
    obj1.a = 2;
    obj1.b.c = 8;
    console.log(JSON.stringify(obj1));  //{"a":2,"b":{"c":8}}
    console.log(JSON.stringify(obj3));  //{"a":1,"b":{"c":1}}

[`Object.create()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create "Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请打开浏览器控制台以查看运行结果。）")

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的**\__proto__**。也就是说，新创建对象的\__proto__ 就是我们所提供的对象。

    let person1 = {car: 'audi',age:'26'};
    let person2 = Object.create(person1);
    console.log(person2); //{}   __proto__: age: "26"car: "audi"
person2是个空对象，但是他的\__proto__属性上面就是person1。

实现类式继承

    // Shape - 父类(superclass)
    function Shape() {
      this.x = 0;
      this.y = 0;
    }

    // 父类的方法
    Shape.prototype.move = function(x, y) {
      this.x += x;
      this.y += y;
      console.info('Shape moved.');
    };

    // Rectangle - 子类(subclass)
    function Rectangle() {
      Shape.call(this); // call super constructor.
    }

    // 子类续承父类
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;

    var rect = new Rectangle();

    console.log('Is rect an instance of Rectangle?',
      rect instanceof Rectangle); // true
    console.log('Is rect an instance of Shape?',
      rect instanceof Shape); // true
    rect.move(1, 1); // Outputs, 'Shape moved