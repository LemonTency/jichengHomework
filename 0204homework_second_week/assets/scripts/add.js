// var app6 = new Vue({
//     el: '#app-6',
//     data: {
//       message: 'Hello Vue!'
//     }
//   })

class Create{
    constructor(){
        this.btn = $("#js-btn");
    }
    fn(){
        this.btn.click(function(){
            alert(1);
        })
    }
}

const f = new Create();
f.fn();
export default Create;

//V8对一些新的API都是有优化的，比如map,set等
//如果不管三七二十一就把ES6代码用babel转换为ES5代码，那就白瞎了敲那些ES6代码
