jQuery的一些语法

window.jQuery === window.$

* \$(document).ready(function(){   } )  //只要domTree加载完毕就可以执行
* window.onload() //dom tree和所有文件都加载完毕才可以执行，所以说$(document).ready(function(){   } ) 要先于window.onload()
jQuery还有一个比较独特的用法，就是链式调用
![image.png](https://upload-images.jianshu.io/upload_images/7728915-30c9f2863be15bd8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1. 选择器
![image.png](https://upload-images.jianshu.io/upload_images/7728915-edb29bd217d263c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2.关于事件处理
![image.png](https://upload-images.jianshu.io/upload_images/7728915-f44ac39d2103c2e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
jQuery对于浏览器的兼容做得特别好
利用闭包保证函数私有的作用域
代码初始化要做的工作

        (function(window,undefined){
          var jQuery = function(){
              return new jQuery.fn.init();
          }
        jQuery.fn = jQuery.prototype = {
          init:function(){
         }
        };
          jQuery.fn.init.prototypr = jQuery.fn;
        //重写prototype
          })(window)