####基础知识
https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/
可以参见博文
关于CSS动画
如需在 CSS3 中创建动画，您需要学习 @keyframes 规则。
例如：

        @keyframes demo{
            16%{-webkit-transform:rotate(-90deg)}
        }
然后你必须在某个div中绑定这个动画

              .div
                {
                   animation: myfirst 5s;
                  -moz-animation: myfirst 5s;   /* Firefox */
                  -webkit-animation: myfirst 5s;    /* Safari 和 Chrome */
                  -o-animation: myfirst 5s; /* Opera */
                  }
您必须定义动画的名称和时长。如果忽略时长，则动画不会允许，因为默认值是 0。
请用百分比来规定变化发生的时间，或用关键词 "from" 和 "to"，等同于 0% 和 100%。

0% 是动画的开始，100% 是动画的完成。
如下图所示
![image.png](https://upload-images.jianshu.io/upload_images/7728915-75b9155fed9d0c86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



####HTML结构：

    <div id="view" style="width:160px;height:160px;margin:80px;">
        <div id="box">
            <div class="one">A</div>
            <div>B</div>
            <div>C</div>
            <div>D</div>
            <div>E</div>
            <div>F</div>
        </div>
    </div>

给容器加个3 D属性      

        #box{  transform-style:preserve-3d  }
![与上面代码对应](https://upload-images.jianshu.io/upload_images/7728915-bbfa09a6a78c77b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


        .one{transform:translateZ(80px);}
![与上面代码对应](https://upload-images.jianshu.io/upload_images/7728915-0a9e7eb141eac83c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>我们还利用transform:perspective(xxpx)来进行设置
perspective 属性定义 3D 元素距视图的距离
比如说设置transform:webkit-perspective(90px)
目前浏览器都不支持 perspective 属性。
Chrome 和 Safari 支持替代的 -webkit-perspective 属性。
在元素属性里面加，你看到的将会是他的子元素的透视图
这么说吧，如果刚好一个元素Atransform:translateZ(80px)；理解为向外推了80px
那么我们设置perspective<=80px时，其实我们是在这个结构内部的，也就是说我们在空间上的A的里面，这个时候是看不到A的所以如果是80.5px，这个时候你在A外面，看到的是很大的A，
![image.png](https://upload-images.jianshu.io/upload_images/7728915-6a95c0b660c0f3ea.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
继续增加A，我们看到
![透视距离像素为500px的时候](https://upload-images.jianshu.io/upload_images/7728915-982896e61bb5182a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-5231a3751e66bfb1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
接下来就是比较难的点了，刚开始，我总是搞不清楚rotateX,rotateY,rotateZ是往哪个方向转的。
看了张鑫旭的博客，才恍然大悟
将S正面推倒，就是rotateX
![image.png](https://upload-images.jianshu.io/upload_images/7728915-40540286e033fb27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
让S转身侧面给你欣赏,就是rotateY
![image.png](https://upload-images.jianshu.io/upload_images/7728915-ba967eb2c942be2c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如果S放在地上侧躺着，就是rotateZ
![image.png](https://upload-images.jianshu.io/upload_images/7728915-2b31034a72045bc9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

经过了一番操作之后，终于得到我想要的结果啦！

![image.png](https://upload-images.jianshu.io/upload_images/7728915-5610b1ee9ab78976.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

贴上CSS代码

        #box div{
            position:absolute;
            height:160px;
            width:160px;
            border:2px solid #000;
            text-align:center;
            background:rgba(255,200,100,0.8);
            font-size:130px;

            
        }
        #box{
            transform-style:preserve-3d;
            animation:demo ease-in-out 3s infinite;
            transform-origin:80px 80px 0px; 
        /*          如果origin这个不设置的话，就会导致一些问题*/
        /*          transform:perspective(120px);
            transform-origin:50px 60px;*/

        }
        .one{
            transform:translateZ(80px);
        }
        /*前面*/
        .two{
            transform:rotateX(90deg)translateZ(-80px);
        }
        /*下面*/
        .three{
            transform:rotateX(90deg)rotateY(90deg)translateZ(80px)
        }
        /*左面*/
        .four{
            transform:rotateX(90deg)rotateY(-90deg)translateZ(80px)
        }
        /*右面*/
        .five{
            transform:rotateY(90deg)rotateX(90deg)translateZ(80px);
        }
        /*上面*/
        .six{
            transform:translateZ(-80px);
        }
        /*后面*/

        @keyframes demo{
            16%{-webkit-transform:rotateY(-90deg)}
            33%{-webkit-transform:rotateY(-90deg)rotateZ(135deg)}
            50%{-webkit-transform:rotateY(225deg)rotateZ(135deg)}
            66%{-webkit-transform:rotateY(135deg)rotateZ(135deg)}
            83%{-webkit-transform:rotateX(135deg)}

        }












