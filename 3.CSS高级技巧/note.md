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
渐变来画一个小雨伞
重点一：利用线性渐变来画多几个颜色、
重点二：利用translateY来调整每个面露出来宽度（要记住，做translate变换就让我们想起了        
####BFC,IFC,FFC，GFC
**FC是什么？**
Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (块级格式化上下文，简称BFC)和 Inline formatting context (简称IFC)。
按照上面来讲，BFC就是决定这个块级元素应该如何渲染的规则。跟外面的没有关系。
平常的应用：
被一个浮动元素遮挡，所以就用（overflow:hidden或者float:left等使被遮挡的那个元素变成BFC，就不会被挡住了，还有高度塌陷，还有边距重叠 ）
 **BFC**
1. 如何产生BFC？（产生了BFC之后这个容器里面的元素就会按照BFC的规则来渲染，与其他盒子产生隔离，不会被影响到）
* 根元素
* float属性不为none
* position为absolute或fixed
* display为inline-block, table-cell, table-caption, flex, inline-flex
* overflow不为visible
**渲染规则一：BFC区域不会跟float元素重叠**
看例子：粉红色的被遮住了！！
![image.png](https://upload-images.jianshu.io/upload_images/7728915-d50b1bbe33cc65e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
利用BFC区域不会跟float元素重叠的特性，我们给粉红色的块加上一个overflow:hidden，就让他变成了BFC，所以就不会被红色的压在下面了
![image.png](https://upload-images.jianshu.io/upload_images/7728915-d04cafbd46dad7b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**渲染规则二：计算元素高度时，浮动元素也会参与计算**
一般情况下，父元素的两个子元素都是浮动的话，就会出现高度塌陷的问题，可以看到，我们父元素par设置边框，但是塌陷了，并没有把两个子元素套起来。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-f4b9cddfd6ad30bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
但是我们想到了BFC计算元素高度的时候，浮动元素也会参与计算，那么我们为了清除内部浮动，使得父元素计算高度的时候也把子元素计算在内，所以我们给父元素添加一个属性，例如（overflow:hidden)，就可以解决高度塌陷的问题了。
**渲染规则三：两个BFC区域之间是不会发生边距重叠的**
![image.png](https://upload-images.jianshu.io/upload_images/7728915-d378940ea22d03bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
那我们直接给两个P都加上overflow:hidden就可以完美解决边距重叠的问题。
或者我们把其中一个 hehe或者haha加上overflow:hidden也可以的。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-93da4d51f6afe7f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**IFC**
IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)

**FFC**
FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，display值为flex或者inline-flex的元素将会生成自适应容器（flex container）。

**GFC**
GFC(GridLayout Formatting Contexts)直译为"网格布局格式化上下文"，当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间。 



**最后是用了mix-blend-mode来实现给文字上纹理**
有趣
![image.png](https://upload-images.jianshu.io/upload_images/7728915-cf77eaa7a680e893.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

