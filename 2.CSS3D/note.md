####基础知识
https://www.zhangxinxu.com/wordpress/2010/11/css3-transitions-transforms-animation-introduction/

https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/
可以参见博文

#####关于CSS2D动画
* transition, 过渡
transition属性是下面几个属性的缩写：
1. transition-property
指定过渡的属性值，比如transition-property:opacity就是只指定opacity属性参与这个过渡。
all是说明所有属性都参与这个过渡。
2. transition-duration
指定这个过渡的持续时间
3. transition-delay
延迟过渡时间
4. transition-timing-function
指定过渡动画缓动类型，有ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier()
其中，linear线性过度，ease-in由慢到快，ease-out由快到慢，ease-in-out由慢到快在到慢。
写个小小的例子：

        div{
            width: 100px;
            height: 100px;
            background-color: #527281;
            border-radius: 5px;
            border: 1px solid #999;
        }
        .trans{
            -webkit-transition-property: background-color;
            -webkit-transition-duration: 0.3s;
            -webkit-transition-timing-function: ease;
        }
        .trans:hover{
            background-color:black;
        }
        <div class = "trans">

        </div>
hover之后background-color就会改变了。

        .trans_list{
            width: 50px;
            height: 50px;
            margin: 50px 0;
            background-color: #888;
        }
        .ease{
            -webkit-transition: all 4s ease;
        }
        .trans_list:hover{
            background-color: #8088C8;
            margin-right: 20px;
            border-radius: 5px;
        }
        <div id="transBox" class="trans_box">
            <div class="trans_list ease">ease</div>
            <div class="trans_list ease">ease</div>
            <div class="trans_list ease">ease</div>
            <div class="trans_list ease">ease</div>
        </div> 

* transform, 变换
transform指变换，，拉伸，压缩，旋转，偏移。见下面示例代码：

        .trans_skew { transform: skew(35deg); }
        .trans_scale { transform:scale(1, 0.5); }
        .trans_rotate { transform:rotate(45deg); }
        .trans_translate { transform:translate(10px, 20px); }
当transform和transition一起组合的时候，就会产生妙不可言的化学效果

        .trans{
            width: 200px;
            height: 200px;
            margin: 200px auto;
            background-color: #8088C8;
            text-align: center;
            -webkit-transition: all 2s ease-in-out;
            -moz-transition: all 2s ease-in;
        }
        .trans:hover{
            -webkit-transform: rotate(720deg) scale(2,2);       
        }
        <div class="trans">
        摸我一下看看
        </div>
![image.png](https://upload-images.jianshu.io/upload_images/7728915-2444958551d5c1c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-f3569e41a9e68f41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* animation  动画

如需在 CSS3 中创建动画，您需要学习 @keyframes 规则。
例如：

        @keyframes myfirst{
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
其实这一番操作，是历经了千辛万苦的哎
1. rotateX之后，其实重心也是在改变的，所以在rotateX(90deg)之后再进行rotateY(90deg)的方向不是按照原来的Y轴了，而是按照旋转之后的Y轴
可以看看这个
![rotateX，想象着将其正面推倒45°](https://upload-images.jianshu.io/upload_images/7728915-6ea430ef0fdfc633.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![正面推倒.png](https://upload-images.jianshu.io/upload_images/7728915-2367ca0c3fa6cf92.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

        .div2{
            transform:rotateX(45deg)rotateY(45deg);
        }
![在正面推到45度的基础上，侧身45度](https://upload-images.jianshu.io/upload_images/7728915-c0c761f0166e791e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

        .div2{
            transform:rotateX(45deg)rotateY(45deg)rotateZ(45deg)
        }
![image.png](https://upload-images.jianshu.io/upload_images/7728915-fcb136ec16178251.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
重心是改变了的。
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
        /*右面*/
        .four{
            transform:rotateX(90deg)rotateY(-90deg)translateZ(80px)
        }
        /*左面*/
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
通过控制台工具
可以看到绘制的整个过程
在移动端的绘制过程中如果你同时用鼠标点击你的正方体可能会有点问题，直接把touch-start干掉就行了
![image.png](https://upload-images.jianshu.io/upload_images/7728915-85ee069d42ea3f64.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)















