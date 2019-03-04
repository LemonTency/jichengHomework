#### 浏览器渲染过程

还记得HTTP协议吗？
https://www.jianshu.com/p/b8b768625d54
![image.png](https://upload-images.jianshu.io/upload_images/7728915-01158aaa3b4dd8f1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Prompt for unload ： 将当前页面卸载掉。

unload和redirect并行。

redirect：内部跳转/重定向。判断URL的类型，判断URL的资源是否在本地缓存。如果本地缓存没有，就不用进行DNS。

App cache：如果rediect中发现本地有缓存，就会来处理App cache。处理缓存这里是一个最大的优化点。

DNS：属于应用层协议。基于UDP（传输层协议）
在DNS基础上有一种CDN技术，自动选择最快的服务器。

TCP：优化点：使用长连接。
Request+Response： HTTP协议作用。

Processing：浏览器处理数据，处理HTML文档（DOM）。

onload：将页面装载到浏览器。

上图就是W3C定义的浏览器端的一个标准处理模型。
也就是代表着在浏览器这一端和服务器通信的时候，究竟经过了多少个步骤。

#### DNS详解
DNS：Domain Name System,用于将域名转换为IP
* 顶级域名   baidu.com  如果是www.baidu.com的前面加了www前缀的话那就是二级域名了。三级域名以此类推。
* DNS解析流程
![image.png](https://upload-images.jianshu.io/upload_images/7728915-d76a02b82d163513.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Root Server :根服务器，全球只有13台。
DNS的过程应该是下面这样的：

1.  浏览器缓存：浏览器会按照一定的频率缓存DNS记录。
2.  操作系统缓存：如果浏览器缓存中找不到需要的DNS记录，那就去操作系统中找。
3. 路由缓存：路由器也有DNS缓存。
4. ISP的DNS服务器：ISP是互联网服务提供商(Internet Service Provider)的简称，ISP有专门的DNS服务器应对DNS查询请求。
5. 根服务器：ISP的DNS服务器还找不到的话，它就会向根服务器发出请求，进行递归查询（比如查找www.google.com时，DNS服务器先问根域名服务器.com域名服务器（TLD Server）的IP地址，然后再问.com域名服务器（TLD Server）找到google.com名字服务器（Name Server），依次类推）。

* 配置记录类型及其对应含义

![image.png](https://upload-images.jianshu.io/upload_images/7728915-a74f87cb74f0a299.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### TCP三次握手

* TCP三次握手和四次挥手
![TCP三次握手和四次挥手](https://upload-images.jianshu.io/upload_images/7728915-373cefa63d52dc8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
接受到上层的信息到本层加上对应的协议头


* TCP协议模型
![TCP协议模型详解](https://upload-images.jianshu.io/upload_images/7728915-df267518a8ccd878.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
websocket属于应用层，是对TCP的模拟。

* 为什么是三次握手？为什么是四次挥手？
![image.png](https://upload-images.jianshu.io/upload_images/7728915-4d5cf976f2e0e525.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**握手流程**
1.  客户端对服务器发送一个SYN x

2.  服务器对客户端响应一个SYN y，同时对SYN x进行确认 ACK x＋1

3.  客户端再对服务器响应一个确认ACK y＋1

客户端调用connect时，触发了连接请求，向服务器发送了SYN x包，这时connect进入阻塞状态；
服务器监听到连接请求，即收到SYN x包，调用accept函数接收请求向客户端发送SYN y ，ACK x+1，这时accept进入阻塞状态；
客户端收到服务器的SYN y ，ACK x+1之后，这时connect返回，并对SYN K进行确认,也就是发送ACK K+1；
服务器收到ACK K+1时，accept返回，至此三次握手完毕，连接建立。

**谁发起连接谁是客户端。**
为防止半连接（一端已经断开连接另外一端还不知道）就必须需要四次挥手。

**为什么是三次握手？**

**那么，为什么是四次挥手？**
  这是因为服务端在LISTEN状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。而关闭连接时，当收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，Server也未必全部数据都发送给对方了，所以Server可以立即close，也可以发送一些数据给对方后，再发送FIN报文给对方来表示同意现在关闭连接，因此，ACK和FIN一般都会分开发送，所以是四次挥手。

#### HTTP缓存机制
详细可以参考我之前写的文章
https://www.jianshu.com/p/09fa84040ea6
#### CDN与集群
![没有CDN时](https://upload-images.jianshu.io/upload_images/7728915-d133456fce2020da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![有了CDN时](https://upload-images.jianshu.io/upload_images/7728915-9703ea361e118b24.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

CDN的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。
CDN技术：镜像，数据同步，内容分发。
例如百度，有自己的名称服务器，在DNS时，划定一定的规则，识别用户是哪个区域的，就近将离用户最近速度最快的IP地址推给用户。
