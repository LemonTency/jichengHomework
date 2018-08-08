![image.png](https://upload-images.jianshu.io/upload_images/7728915-be8388a6eba7acce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 利用img来测网速
* img标签有一个属性 crossorigin = "anonymous"

在HTML5中，一些 HTML 元素提供了对 CORS 的支持， 例如**img** 和**video**均有一个跨域属性 (crossOrigin property)，它允许你配置元素获取数据的 CORS 请求。 这些属性是枚举的，并具有以下可能的值：

anonymous  ：对此元素的CORS请求将不设置凭据标志。
use-credentials ：对此元素的CORS请求将设置凭证标志; 这意味着请求将提供凭据。

    <script src="https://example.com/example-framework.js"
    crossorigin="anonymous"></script>
你可以使用上面的<script> 元素告诉一个浏览器执行来自 https://example.com/example-framework.js 的脚本而不发送用户凭据。

代码：
        
        <script>
      var s = Date.now();
      console.log(s);
      var image = new Image();
      image.crossorigin = 'anonymous';
      image.src = "https://webmap1.bdimg.com/mobile/simple/static/index/images/index-nb-round_3e43e00.png";
      image.onload = function(){
        var e = Date.now();
        console.log(e);
        var w = 13.9/(e-s); //kb/ms  加载图片的大小/加载的时间
        console.log(w);
      }
    </script>
图片是随便去百度地图那里找的
![image.png](https://upload-images.jianshu.io/upload_images/7728915-1c856299343c4c2e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
复制地址就可以直接用了
![这是一张雪碧图来着.png](https://upload-images.jianshu.io/upload_images/7728915-98dc699d17ed5e1b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**有什么用处？**
根据用户网速来决定加载什么图（高清还是普通）

还可以用img来监控bug,访问一些用户数据。

####CSS远程攻击漏洞
* background:url("....")
如果url里面是恶意的JS脚本代码，那就GG了

expression是IE所独有的CSS属性，其目的就是为了插入一段[JavaScript](https://www.2cto.com/kf/qianduan/JS/)代码，示例如下：
a{text:expression(target="_blank");}

当在IE下执行这段CSS后，它会给所有的链接都加上target="_blank"属性。如果将“target="_blank"”替换成其他代码，如alert(1)，那么刷新页面后就会不断地弹出窗口。

        
       .test {
        color: expression(alert('XSS'));
        background: url(javascript:alert('script injected'))
        }
* ::content
  
         .test::after {
              content:  url(javascript:alert('script injected'))
          }

`补充知识`：
`正确的利用伪元素和伪类能够让我们的html结构更清晰合理，也能在一定程度上减少js对dom的操作！`
`CSS3标准里面：伪类是一个：，伪元素是：：（CSS3用来区分的，但是可能IE8或以下兼容不了）`
伪类主要包括状态伪类（active这些）和结构性伪类（能够减少class和id属性的定义）：

* :link 应用于未被访问过的链接；

* :hover 应用于鼠标悬停到的元素；

* :active 应用于被激活的元素；

* :visited 应用于被访问过的链接，与:link互斥。

* :focus 应用于拥有键盘输入焦点的元素。

* :first-child  选择某个元素的第一个子元素 ...

伪元素：伪元素是对元素中的特定内容进行操作，而不是描述状态。它的操作层次比伪类更深一层，因此动态性比伪类低很多。实际上，伪元素就是选取某些元素前面或后面这种普通选择器无法完成的工作。控制的内容和元素是相同的，但它本身是基于元素的抽象，并不存在于文档结构中（也就是不会增加DOM）！常见的伪元素选择器包括：
* :first-letter 选择元素文本的第一个字（母）。

* :first-line 选择元素文本的第一行。

* :before 在元素内容的最前面添加新内容。

* :after 在元素内容的最后面添加新内容。

######伪元素用法
1.  清除浮动
如果父元素的所有子元素都是浮动的，父元素的高度则无法撑开。可以通过对父元素添加after伪类撑开父元素高度，因为after就是其最后一个子元素。

        .clear:after {
            content: '';
            display: block;
            clear: both;
        }
2. 画分割线
![image.png](https://upload-images.jianshu.io/upload_images/7728915-ac0d8e9c96ecb20a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
          
        <style>
          * {
                padding: 0;
                margin: 0;
            }
          .spliter::before, .spliter::after {
              content: '';
              display: inline-block;
              border-top: 1px solid black;
              width: 200px;
              margin: 5px;
          }
        </style>
        </head>
        <body>
            <p class="spliter">分割线</p>
        </body>
3. 计数器

用js做个计数器是比较常见的，但我css也能实现！用到的属性有：
counter-reset: 属性设置某个选择器出现次数的计数器的值。默认为 0。counter-increment: 属性设置某个选取器每次出现的计数器增量。默认增量是 1。
content: 插入生成内容。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-b5906090f61c01a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


    <style>
       .chooses input:checked {
          counter-increment: letters;
    }

      .choose span:after {
        content: counter(letters);
    }
    </style>
    </head>
     <body>
       <div class="chooses">
        <input type="checkbox">a
        <input type="checkbox">b
        <input type="checkbox">c
        <input type="checkbox">d
        <input type="checkbox">e
        <input type="checkbox">f
        <input type="checkbox">g
        <input type="checkbox">h
        <input type="checkbox">i
        <input type="checkbox">j
      </div>
    <p class="choose">我选择了<span></span>个字母</p>
    </body>

####利用iframe给本地localStorage扩容
关于iframe
https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe
内联的框架，就像 [`<frame>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/frame "<frame> 是 HTML 元素，它定义了一个特定区域，另一个 HTML 文档可以在里面展示。帧应该在 <frameset> 中使用。") 元素一样，会加入 `[window.frames](https://developer.mozilla.org/en-US/docs/DOM/window.frames "DOM/window.frames")` 伪数组（类数组的对象）中。

通过contentWindow属性，脚本可以访问iframe元素所包含的HTML页面的window对象。contentDocument属性则引用了iframe中的文档元素（等同于使用contentWindow.document），但IE8-不支持。

通过访问window.parent，脚本可以从框架中引用它的父框架的window。

脚本试图访问的框架内容必须遵守[同源策略](https://developer.mozilla.org/en-US/docs/Same_origin_policy_for_JavaScript "/en-US/docs/Same_origin_policy_for_JavaScript")，并且无法访问非同源的window对象的几乎所有属性。同源策略同样适用于子窗体访问父窗体的window对象。跨域通信可以通过[window.postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage "/zh-CN/docs/Web/API/Window/postMessage")来实现

阮一峰老师的http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html这一篇博文也讲过，iframe可以通过postMessage来跨域，下面的是简要的分析（iframe,window.open同理）

假设父窗口是www.aaa.com
子窗口是www.bbb.com
> ```
> var popup = window.open('http://bbb.com', 'title');
> popup.postMessage('Hello World!', 'http://bbb.com');
> 
> ```
上面的代码此时就是父窗口对子窗口发送信息了
相同的，子窗口也能对父窗口发送信息
>```
>window.opener.postMessage('Nice to see you', 'http://aaa.com');
>```
两个窗口都能对通过message事件监听对方的消息

        window.addEventListener('message', function(e) {
          console.log(e.data);
        },false);
message中的event对象有以下几种属性
* event.source：发送消息的窗口
* event.origin: 消息发向的网址
* event.data: 消息内容

**那么问题来了，怎么通过postMessage给localStorage扩容呢？**


下面就是在iframe的子窗口监听message事件，这里将父窗口发来的信息写入自己的localStorage里面（按照情况可以用Json.parse和Json.stringify来转换数据格式）
    
            window.addEventListener('message',function(e){
              if(e.source !== window.parent){//判断是否是父窗口传来的信息
              return 
            }else{
            localStorage.setItem(e.data.key,e.datavalue)
          }
        })

来个完整版的

> ```
> //子窗口初级版
> window.onmessage = function(e) {
>   if (e.origin !== 'http://bbb.com') {
>     return;
>   }
>   var payload = JSON.parse(e.data);
>   localStorage.setItem(payload.key, JSON.stringify(payload.data));
> };
> 
> ```

>```
>//父窗口初级版
>var win = document.getElementsByTagName('iframe')[0].contentWindow;
>var obj = { name: 'Jack' };
>win.postMessage(JSON.stringify({key: 'storage', data: obj}), 'http://bbb.com');
```


    //子窗口升级版
    window.onmessage = function(e) {
      if (e.origin !== 'http://bbb.com') return;
      var payload = JSON.parse(e.data);
      switch (payload.method) {
        case 'set':
          localStorage.setItem(payload.key, JSON.stringify(payload.data));
          break;
        case 'get':
          var parent = window.parent;
          var data = localStorage.getItem(payload.key);
          parent.postMessage(data, 'http://aaa.com');
          break;
        case 'remove':
          localStorage.removeItem(payload.key);
          break;
      }
    };

    //父窗口升级版
    var win = document.getElementsByTagName('iframe')[0].contentWindow;
    var obj = { name: 'Jack' };
    // 存入对象
    win.postMessage(JSON.stringify({key: 'storage', method: 'set', data: obj}), 'http://bbb.com');
    // 读取对象
    win.postMessage(JSON.stringify({key: 'storage', method: "get"}), "*");
    window.onmessage = function(e) {
      if (e.origin != 'http://aaa.com') return;
      // "Jack"
      console.log(JSON.parse(e.data).name);
    };

    思路大概是这样的：
1. 在【A域】下引入【B域】，【A域】空间足够时，读写由【A域】来完成，数据存在【A域】下；当【A域】空间不够时，读写由【B域】来完成，数据存在【B域】下

2.【A域】空间不够需要在【B域】读写时，通过postMessage 向【B域】发送跨域消息，【B域】监听跨域消息，在接到指定的消息时进行读写操作

3.【B域】接到跨域消息时，如果是写入删除可以不做什么，如果是读取，就要先读取本域本地数据通过postMessage向父页面发送消息

4.【A域】在读取【B域】数据时就需要监听来自【B域】的跨域消息

注意事项：

1. window.postMessage()方法，向【B域】发消息，应用window.frames[0].postMessage() 这样iframe内的【B域】才可以接到

2. 同理，【B域】向 【A域】发消息时应用，window.parent.postMessage()

3.【A域】的逻辑一定要在iframe 加载完成后进行

####HTML语义化重要性
https://juejin.im/entry/5ab5f229518825558a069304

* 正确的标签做正确的事情
* 页面内容结构化
* 无CSS样子时也容易阅读，便于阅读维护和理解
* 便于浏览器、搜索引擎解析。 利于爬虫标记、利于SEO

