####双飞翼布局
什么是双飞翼布局呢？
* 事实上，圣杯布局其实和双飞翼布局是一回事。它们实现的都是三栏布局，**两边的盒子宽度固定，中间盒子自适应**也就是我们常说的固比固布局。它们实现的效果是一样的，差别在于其实现的思想。
像淘宝，是中间栏优先渲染。
https://alistapart.com/article/holygrail  这是一篇讲圣杯布局的文章，讲的挺不错的。
大概内容是这样的：

        <div id="header"></div><div id="container">
        <div id="center" class="column"></div>
        <div id="left" class="column"></div>
        <div id="right" class="column"></div></div><div id="footer"></div>
就是这样。一个额外的div包含列是你所需要的，这甚至满足了我强迫症的习惯。

样式表几乎一样简单。假设你想要有一个固定宽度为200px的左列和一个固定宽度为150px的右列。为了简化注释，我将分别将左、右和中心列缩写为LC、RC和CC。这里必不可少的CSS：

        body {
          min-width: 550px;      /* 2x LC width + RC width */
        }
        #container {
          padding-left: 200px;   /* LC width */
          padding-right: 150px;  /* RC width */
        }
        #container .column {
         position: relative;
         float: left;   
       }
        #center {
          width: 100%;
          background-color: pink;
      }
        #left {
          width: 200px;          /* LC width */
          right: 200px;          /* LC width */
          margin-left: -100%;
          background-color: black;
      }
        #right {
          width: 150px;          /* RC width */
          margin-right: -150px;  /* RC width */
          background-color: black;
      }
        #footer {
          clear: both;
     }
      /*** IE6 Fix ***/
      * html #left {
         left: 150px;           /* RC width */
    }

####iconfont
关于矢量图标
![可以用symbol方式引入，这是有色彩的](https://upload-images.jianshu.io/upload_images/7728915-c201fb027d2d6035.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
也可以用unicode引入，但是没有色彩，但是兼容性可能会好点。

![矢量](https://upload-images.jianshu.io/upload_images/7728915-ecb77f1586ff5ce4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**另外一个纯CSS实现的图标库**
https://cssicon.space
![image.png](https://upload-images.jianshu.io/upload_images/7728915-f5c948c41703a809.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

        <div class="suitcase-2 icon"></div>   //html
        .suitcase-2.icon {
          color: #000;
          position: absolute;
          margin-left: 2px;
          margin-top: 6px;
          width: 15px;
          height: 10px;
          border-radius: 2px;
          border: solid 1px currentColor;
        }

        .suitcase-2.icon:before {
          content: '';
          position: absolute;
          left: 4px;
          top: -3px;
          width: 5px;
          height: 2px;
          border-radius: 3px 3px 0 0;
          border-top: solid 1px currentColor;
          border-left: solid 1px currentColor;
          border-right: solid 1px currentColor;
        }

        .suitcase-2.icon:after {
            content: '';
            position: absolute;
            left: 3px;
            width: 7px;
            height: 10px;
            border-left: solid 1px currentColor;
            border-right: solid 1px currentColor;
            background-color: currentColor;
            }

####巧用box-shadow和after,before伪类用一个div当多个div
**关于box-shadow**
给div添加box-shadow

        div
          {
            box-shadow: 10px 10px 5px #888888;
          }
阴影大小一般是跟所在的div的大小一样，也就是说，如果我们要做一个比div小一点的阴影的话，就可以用after或者before伪类来设置一下宽高（也就是我们的bpx-shadow的宽高）
box-shadow: h-shadow（水平阴影的位置） v-shadow （垂直阴影位置）blur （模糊距离）spread（阴影的尺寸） color （颜色）inset（将外部阴影 (outset) 改为内部阴影）;

那如果，我们不要模糊距离，那一个小块不是出来了？

![做了一个after,里面包含3个阴影.png](https://upload-images.jianshu.io/upload_images/7728915-30f08aee32ae69c9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    <div class = "container"></div>  //html代码
        .container{
            background-color:black;
            width:200px;
            height:200px;
            box-shadow: 200px 200px 0 pink;
        }
        .container::before {
            content: '';
            width: 100px;
            height: 100px;
            /*要给before伪类设置一些高度*/
            display: block;
            margin: 0;
            position: absolute; 
            box-shadow: 200px 0px 0 red,300px 0px 0 yellow,400px 0px 0 blue;
           /* box-shadow第一第二个变量是代表相对于我container这个元素的距离，水平偏移200px，垂直偏移00px*/
        }
**关于border-radius**

        border-radius:2em;
 等价于

       border-top-left-radius:2em;
       border-top-right-radius:2em;
       border-bottom-right-radius:2em;
       border-bottom-left-radius:2em;
**关于渐变**
 linear-gradient
radial-gradient
http://www.runoob.com/css3/css3-gradients.html
        
####BFC,IFC,FFC

**最后是用了mix-blend-mode来实现给文字上纹理**
有趣
![image.png](https://upload-images.jianshu.io/upload_images/7728915-cf77eaa7a680e893.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

