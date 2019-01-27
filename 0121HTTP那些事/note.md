#### 了解TCP/IP协议栈
![image.png](https://upload-images.jianshu.io/upload_images/7728915-a8293591c901b74c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
左边是ISO/OSI网络体系结构（国际组织的标准规范），右边是TCP/IP协议模型。
ISO/OSI网络体系结构把应用层划分得更加细了。


* 应用层 
为用户提供所需要的各种服务，例如：HTTP、FTP、DNS、SMTP等. 
* 传输层 
为应用层实体提供端到端的通信功能，保证数据包的顺序传送及数
据的完整性。 
该层定义了两个主要的协议：传输控制协议**（TCP）**和用户数据报协
议**（UDP)**
* 网络层 
主要解决主机到主机的通信问题。**IP协议**是网际互联层最重要的协
议。 
* 网络接口层 
负责监视数据在主机和网络之间的交换。
#### UDP
***
##### 面向报文
UDP 是一个面向报文（报文可以理解为一段段的数据）的协议。意思就是 UDP 只是报文的搬运工，不会对报文进行任何拆分和拼接操作。
具体来说，
在发送端，应用层将数据传递给传输层的 UDP 协议，UDP 只会**给数据增加一个 UDP 头标识下是 UDP 协议**，然后就传递给网络层了
在接收端，网络层将数据传递给传输层，UDP 只**去除 IP 报文头就传递给应用层**，不会任何拼接操作
##### 不可靠性
1. UDP是无连接的，也就是说通信不需要建立和断开连接
2. UDP也是不可靠的，收到什么数据就传递什么数据，也不备份数据，也不关心对方到底有没有收到数据。
3. UDP没有拥塞控制，只会以恒定的速率去发送，这样实现的弊端就是在网络条件不好的情况下可能会导致丢包，但是优点也很明显，在某些实时性要求高的场景（比如电话会议）就需要使用 UDP 而不是 TCP。
##### 高效
  UDP没有TCP那么复杂，所以头部开销很小，只有八字节，相对于TCP的二十字节要小的多，所以在传输报文的时候是很高效的。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-4a1be24dad2aef33.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
头部包含了下面几个数据。
* 两个十六位的端口号，分别为源端口（可选字段）和目标端口
* 整个数据报文的长度
* 整个数据报文的检验和（IPv4可选字段）,用于发现头部信息和数据中的错误。
##### 传输方式
支持一对多，多对一，多对多，一对一，UDP提供了多播，单播，广播的功能。

#### TCP
***
##### 头部
TCP头部要比UDP复杂的多。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-4a1be24dad2aef33.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
对于TCP来说，以下字段是很重要的。
* Sequence number，这个序号保证了 TCP 传输的报文都是有序的，对端可以通过序号顺序的拼接报文
* Acknowledgement Number，这个序号表示数据接收端期望接收的下一个字节的编号是多少，同时也表示上一个序号的数据已经收到
* Window Size，窗口大小，表示还能接收多少字节的数据，用于流量控制
* 标识符
  * URG=1：该字段为一表示本数据报的数据部分包含紧急信息，是一个高优先级数据报文，此时紧急指针有效。紧急数据一定位于当前数据包数据部分的最前面，紧急指针标明了紧急数据的尾部。

  * ACK=1：该字段为一表示确认号字段有效。此外，TCP 还规定在连接建立后传送的所有报文段都必须把 ACK 置为一。

  * PSH=1：该字段为一表示接收端应该立即将数据 push 给应用层，而不是等到缓冲区满后再提交。

  * SYN=1：当SYN=1，ACK=0时，表示当前报文段是一个连接请求报文。当SYN=1，ACK=1时，表示当前报文段是一个同意建立连接的应答报文。

  * FIN=1：该字段为一表示此报文段是一个释放连接的请求报文。
##### 状态机
HTTP 是无连接的，所以作为下层的 TCP 协议也是无连接的，虽然看似 TCP 将两端连接了起来，但是其实只是两端共同维护了一个状态。

TCP 的状态机是很复杂的，并且与建立断开连接时的握手息息相关，接下来就来详细描述下两种握手。

在这之前需要了解一个重要的性能指标 RTT。该指标表示发送端发送数据到接收到对端数据所需的往返时间。

###### 三次握手
![image.png](https://upload-images.jianshu.io/upload_images/7728915-dd952514a175e36d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**你是否有疑惑明明两次握手就可以建立起连接，为什么还需要第三次应答？**
可以想象如下场景。客户端发送了一个连接请求 A，但是因为网络原因造成了超时，这时 TCP 会启动超时重传的机制再次发送一个连接请求 B。此时请求顺利到达服务端，服务端应答完就建立了请求。如果连接请求 A 在两端关闭后终于抵达了服务端，那么这时服务端会认为客户端又需要建立 TCP 连接，从而应答了该请求并进入 ESTABLISHED 状态。此时客户端其实是 CLOSED 状态，那么就会导致服务端一直等待，造成资源的浪费。

PS：在建立连接中，任意一端掉线，TCP 都会重发 SYN 包，一般会重试五次，在建立连接中可能会遇到 SYN FLOOD 攻击。遇到这种情况你可以选择调低重试次数或者干脆在不能处理的情况下拒绝请求。

######断开链接四次握手
![image.png](https://upload-images.jianshu.io/upload_images/7728915-fcbe00838bb57fcc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**为什么 A 要进入 TIME-WAIT 状态，等待 2MSL 时间后才进入 CLOSED 状态？**

为了保证 B 能收到 A 的确认应答。若 A 发完确认应答后直接进入 CLOSED 状态，如果确认应答因为网络问题一直没有到达，那么会造成 B 不能正常关闭。

##### ARQ
RQ 协议也就是**超时重传机制**。通过确认和超时机制保证了数据的正确送达，ARQ 协议包含停止等待 ARQ 和连续 ARQ。

###### 停止等待ARQ
* 正常传输过程
只要 A 向 B 发送一段报文，都要**停止发送**并启动一个定时器，等待对端回应，在定时器时间内**接收到对端应答就取消**定时器并发送下一段报文。
* 报文丢失或出错
在报文传输的时候如果出现丢包，这时候如果超过定时器设定的时间就会再次发送丢的包直到对端回应，所以每次都需要备份发送的数据。
在超时的情况下也  可能出现应答很迟到达，这时 A 端会判断该序号是否已经接收过，如果接收过只需要丢弃应答即可。
PS：一般定时器设定的时间都会大于一个 RTT 的平均时间。

* ACK 超时或丢失
对端传输的应答也可能出现丢失或超时的情况。那么超过定时器时间 A 端照样会重传报文。这时候 B 端收到相同序号的报文会丢弃该报文并重传应答，直到 A 端发送下一个序号的报文。

  在超时的情况下也可能出现应答很迟到达，这时 A 端会判断该序号是否已经接收过，如果接收过只需要丢弃应答即可。

  **这个协议的缺点就是传输效率低，在良好的网络环境下每次发送报文都得等待对端的 ACK**

###### 连续ARQ
在连续 ARQ 中，发送端拥有一个发送窗口，可以在没有收到应答的情况下持续发送窗口内的数据，这样相比停止等待 ARQ 协议来说减少了等待时间，提高了效率。
* 累计确认
连续 ARQ 中，接收端会持续不断收到报文。如果和停止等待 ARQ 中接收一个报文就发送一个应答一样，就太浪费资源了。通过累计确认，可以在收到多个报文以后统一回复一个应答报文。报文中的 ACK 可以用来告诉发送端这个序号之前的数据已经全部接收到了，下次请发送这个序号 + 1的数据。


##### 滑动窗口
在 TCP 中，两端都维护着窗口：分别为发送端窗口和接收端窗口。

发送端窗口包含已发送但未收到应答的数据和可以发送但是未发送的数据。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-0b36211ab5ce75eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
Sent and Ackownledged(已经发送已经收到应答)
Sent and Not Yet Acknowledged(已经发送但没收到应答)
Not Sent (还没发送，但是可以发送)
发送端窗口的大小是由接收端窗口的大小决定的，**接收方会把当前接收窗口的剩余大小写入应答报文**，发送端根据该值和网络拥塞状况来设定发送窗口的大小，所以发送窗口的大小是不断变化的。
**当发送端收到应答报文之后，会将窗口进行滑动**

![image.png](https://upload-images.jianshu.io/upload_images/7728915-ad6b4e9f11897f86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
滑动窗口实现了流量控制。接收方通过报文告知发送方还可以发送多少数据，从而保证接收方能够来得及接收数据。

* Zero 窗口
在发送报文的过程中，可能会遇到对端出现零窗口的情况。在该情况下，发送端会停止发送数据，并启动 persistent timer 。该定时器会定时发送请求给对端，让对端告知窗口大小。在重试次数超过一定次数后，可能会中断 TCP 链接。

##### 拥塞处理
拥塞处理和流量控制不同，流量控制是作用于接收方，保证接收方来得及接受数据。而**拥塞处理是作用于网络**，防止过多的数据拥塞网络，避免出现网络负载过大的情况。

拥塞处理包括了四个算法，分别为：慢开始，拥塞避免，快速重传，快速恢复
* 慢开始
在传输开始时将发送窗口慢慢指数级扩大，从而避免一开始就传输大量数据导致网络拥塞。
算法具体步骤如下：
1. 连接初始设置拥塞窗口（Congestion Window） 为 1 MSS（一个分段的最大数据量）
2. 每过一个 RTT 就将窗口大小乘二
3. 有一个阈值限制，当窗口大小大于阈值时就会启动拥塞避免算法。


* 拥塞避免
拥塞避免算法相比简单点，每过一个 RTT 窗口大小只加一，这样能够避免指数级增长导致网络拥塞，慢慢将大小调整到最佳值。

  在传输过程中可能定时器超时的情况，这时候 TCP 会认为网络拥塞了，会马上进行以下步骤：

1.  将阈值设为当前拥塞窗口的一半
2.  将拥塞窗口设为 1 MSS
3.  启动拥塞避免算法


* 快速重传和快恢复
快速重传一般和快恢复一起出现。如果收到三个重复的 ACK，无需等待定时器超时再重发而是启动快速重传。具体算法分为两种：

**TCP Taho 实现如下**
1. 将阈值设为当前拥塞窗口的一半
2. 将拥塞窗口设为 1 MSS
3. 重新开始慢开始算法
4. TCP Reno 实现如下

**拥塞窗口减半**
1. 将阈值设为当前拥塞窗口
2. 进入快恢复阶段（重发对端需要的包，一旦收到一个新的 ACK 答复就退出该阶段）
3. 使用拥塞避免算法

#### HTTP协议
***
HTTP协议是无状态协议，不会保存状态
##### POST和GET的区别
先看看什么是幂等和副作用。
副作用指**对服务器上的资源做改变**，搜索是无副作用的，注册是副作用的。
幂等指**发送 M 和 N 次请求（两者不相同且都大于 1），服务器上资源的状态一致**，比如注册 10 个和 11 个帐号是不幂等的，对文章进行更改 10 次和 11 次是幂等的。
在应用场景上来说，GET更适合于幂等和无副作用的的场景，例如搜索关键字。POST多用于不幂等和有副作用的场景，例如注册。
从技术的角度说：
* Get 请求能缓存，Post 不能
* Post 相对 Get 安全一点点，因为Get 请求都包含在 URL 里，且会被浏览器保存历史纪录，Post 不会，但是在抓包的情况下都是一样的。
* Post 可以通过 request body来传输比 Get 更多的数据，Get 没有这个技术
* URL有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的
* Post 支持更多的编码类型且不对数据类型限制


##### 常见状态码
   **2XX 成功**
* 200 OK，表示从客户端发来的请求在服务器端被正确处理
* 201 No content，表示请求成功，但响应报文不含实体的主体部分

**3XX重定向**
* 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
* 302 found，临时性重定向，表示资源临时被分配了新的 URL
* 304 not modified 表示服务器允许访问资源,对客户端有缓存情况下服务端的一种响应。(与缓存有关)

**4XX客户端错误**
* 400 bad request，请求报文存在语法错误
* 403 forbidden，表示对请求资源的访问被服务器拒绝
* 404 not found ,表示在服务器上找不到请求的资源

**5XX服务器错误**
* 500 internal sever error，表示服务器端在执行请求时发生了错误
* 501 Not Implemented，表示服务器不支持当前请求所需要的某个功能
* 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求


##### 浏览器行为与HTTP协议
处理流程：
1. 输入网址并回车
2. 解析域名（DNS解析）DNS数据库根据key请求value
3. 浏览器发送HTTP请求(路由策略)
4. 服务器处理请求
5. 服务器返回HTML请求
6. 浏览器处理HTML页面
7. 继续请求其他资源
ps:浏览器会暂时缓存ip地址和网址的关系，不需要再次解析
请求和响应的路由路径是在运营商处理
运营商广告： 劫持并解析请求URI，在请求的资源中插入一些脚本，就是弹广告了


##### HTTP和HTTPS的主要区别
* HTTPS协议需要到CA申请证书，一般免费证书很少，需要交费。

* HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的。

* HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

* HTTPS可以有效的防止运营商劫持，解决了防劫持的一个大问题。

##### HTTP的工作过程
一次HTTP操作称为一个事务，其操作过程可以分为四步：
1. 首先客户机与服务器需要建立连接。只要单击某个超级链接，HTTP的工作开始。（DNS，TCP）

2. 建立连接后，客户机**发送一个请求**给服务器，请求方式的格式为：统一资源标识符(URL)、协议版本号，后边是MIME信息包括请求修饰符、客户机信息和可能的内容。（HTTP）


3. 服务器接到请求后，**给予相应的响应信息**，其格式为一个状态行，包括信息的协议版本号、一个成功或错误的代码，后边是MIME信息包括服务器信息、实体信息和可能的内容。 （HTTP）

4. 客户端接收服务器所返回的信息通过浏览器显示在用户的显示屏上，然后客户机与服务器断开连接。 
如果在以上过程中的某一步出现错误，那么产生错误的信息将返回到客户端，有显示屏输出。对于用户来说，这些过程是由HTTP自己完成的，用户只要用鼠标点击，等待信息显示就可以了。

![image.png](https://upload-images.jianshu.io/upload_images/7728915-a48fae77252d4121.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### HTTP请求和响应

* HTTP请求组成：请求行、消息报头（Request Headers）、请求正文。 
  其中，请求行+消息报头 = 请求头
Request Headers:
  1. accept encoding: gzip,deflate,支持的压缩方式
  2. connection: keep-alive
  3. cookie:把本地的cookie传给服务器
  4. referer: 来源（可以检查是不是跨域了，检查是不是爬虫（来路不正））
  5. user agent: 探针，告诉服务器本地的环境是什么，Mozilla/5.0，在爬虫的时候，伪造这个也是很重要的。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-4bd4f510dde2b867.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
前面带有冒号的说明这是http2的一些参数。
![请求.png](https://upload-images.jianshu.io/upload_images/7728915-1a15ba6bda6d2254.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* HTTP响应组成：状态行、消息报头、响应正文。
其中，状态行+消息报头 = 响应头
 Response Header:
1. content-encoding:与request的accept encoding相对应，内容是压缩的
2. content-length:响应体的大小，为了让浏览器正确解析内容
3. tracecode:追踪码（百度）
![响应.png](https://upload-images.jianshu.io/upload_images/7728915-0373ebff70618cf4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
content-type有个坑，前端没有填的话可能会出错，因为后端用的也是框架，他们也不知道有这个东西。


* 请求行组成：以一个方法符号开头（GET,POST,OPTION等），后面跟着请求的URI（资源的真正的路径）和协议的版本（http1.0，http1.1，http2.0）。 
只要文本后面跟着回车换行符，就标志着一行结束了。
* 状态行组成：服务器HTTP协议的版本，服务器发回的响应状态代码和状
态代码的文本描述

##### HTTP缓存相关
涉及响应头和请求头中expire,last-modified等参数。
详情请见之前的一篇文章。
https://www.jianshu.com/p/09fa84040ea6
![image.png](https://upload-images.jianshu.io/upload_images/7728915-8148550f75de1770.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-0e147ab387683b7b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 请求方法
GET（select）： 请求获取Request-URI所标识的资源 
POST(create)： 在Request-URI所标识的资源后附加新的数据 
HEAD： 请求获取由Request-URI所标识的资源的响应消息报头 （相当于ping方法来进行测试,只取得响应头而不需要响应体）
PUT(update)： 请求服务器存储一个资源，并用Request-URI作为其标识 
DELETE(delete)： 请求服务器删除Request-URI所标识的资源 
TRACE： 请求服务器回送收到的请求信息，主要用于测试或诊断 
CONNECT：HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务OPTIONS： 请求查询服务器的性能，或者查询与资源相关的选项和需求

GET，POST，PUT，DELETE代表增删查改的四个操作。

##### Cookies和Session
由于HTTP是无状态的的协议，所以需要Session和Cookies来维持状态。
会话（Session）跟踪是Web程序中常用的技术，用来跟踪用户的整个会话。
在程序中，会话跟踪是很重要的事情。理论上，一个用户的所有请求操作都应该属于同一个会话，而另一个用户的所有请求操作则应该属于另一个会话，二者不能混淆。例如，用户A在超市购买的任何商品都应该放在A的购物车内，不论是用户A什么时间购买的，这都是属于同一个会话的，不能放入用户B或用户C的购物车内，这不属于同一个会话。

而Web应用程序是使用HTTP协议传输数据的。HTTP协议是无状态的协议。一旦数据交换完毕，客户端与服务器端的连接就会关闭，再次交换数据需要建立新的连接。这就意味着服务器无法从连接上跟踪会话。即用户A购买了一件商品放入购物车内，当再次购买商品时服务器已经无法判断该购买行为是属于用户A的会话还是用户B的会话了。要跟踪该会话，必须引入一种机制。

>Cookies是保存在客户端的小段文本，随客户端点每一个请求发送该url
下的所有cookies到服务器端。
客户端浏览器会把Cookie保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该Cookie一同提交给服务 器。服务器检查该Cookie，以此来辨认用户状态。服务器还可以根据需要修改Cookie的内容。

>`Session`则保存在服务器端，通过唯一的值`sessionID`来区别每一个用户。
`SessionID`随每个连接请求发送到服务器，服务器根据`sessionID`来识别客户端，再通过`session` 的`key`获取`session值`。
`Session`是另一种记录客户状态的机制，不同的是`Cookie`保存在客户端浏览器中，而`Session`保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是`Session`。客户端浏览器再次访问时只需要从该`Session`中查找该客户的状态就可以了。

如果说Cookie机制是通过检查客户身上的“通行证”来确定客户身份的话，那么Session机制就是通过检查服务器上的“客户明细表”来确认客户身份。Session相当于程序在服务器上建立的一份客户档案，客户来访的时候只需要查询客户档案表就可以了。

而服务器就在Session记录相关的信息（客户端的编号等）
###### Cookies的使用
![image.png](https://upload-images.jianshu.io/upload_images/7728915-038d4ff41d4b4e0b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1. Cookie：客户端将服务器设置的Cookie返回到服务器;
2. Set-Cookie：服务器向客户端设置Cookie;
服务器在响应消息中用Set-Cookie头将Cookie的内容回送给客户端，客户端在新的请求中将相同的内容携带在Cookie头中发送给服务器。从而实现会话的保持。
###### Session的使用
![image.png](https://upload-images.jianshu.io/upload_images/7728915-852d985ba5657de2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
* 使用Cookie来实现 
   简单的说，当你登录一个网站的时候，如果web服务器端使用的是session,那么所有的数据都保存在服务器上面，
       客户端每次请求服务器的时候会发送 当前会话的session_id，服务器根据当前session_id判断相应的用户数据标志，以确定用户是否登录，或具有某种权限。
       由于数据是存储在服务器 上面，所以你不能伪造，但是如果你能够获取某个登录用户的session_id，用特殊的浏览器伪造该用户的请求也是能够成功的。
       session_id是服务 器和客户端链接时候随机分配的，一般来说是不会有重复，但如果有大量的并发请求，也不是没有重复的可能性，我曾经就遇到过一次。
       登录某个网站，开始显示的 是自己的信息，等一段时间超时了，一刷新，居然显示了别人的信息。

     Session是由应用服务器维持的一个服务器端的存储空间，用户在连接服务器时，会由服务器生成一个唯一的SessionID,用该SessionID 为标识符来存取服务器端的Session存储空间。而SessionID这一数据则是保存到客户端，用Cookie保存的，用户提交页面时，会将这一 SessionID提交到服务器端，来存取Session数据。这一过程，是不用开发人员干预的。所以一旦客户端禁用Cookie，那么Session也会失效
* 使用URL回显来实现
使用URL附加信息的方式，也就是像我们经常看到JSP网站会有aaa.jsp?JSESSIONID=*一样的。这种方式和第一种方式里面不设置Cookie过期时间是一样的。(URL重写，就是把session id直接附加在URL路径的后面。)

##### HTTPS协议分析
HTTPS是Hypertext Transfer Protocol over Secure Socket Layer的缩写，即HTTP over SSL，可理解为基于SSL的HTTP协议。HTTPS协议安全是由SSL协议实现的。 

**http和https的主要区别：**
* HTTPS协议需要到CA申请证书，一般免费证书很少，需要交费。

* HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的。

* HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

* HTTPS可以有效的防止运营商劫持，解决了防劫持的一个大问题。
关于密钥公钥可以参考之前的文章：
https://www.jianshu.com/p/db9804a74456
##### HTTP2协议栈
* **HTTP2协议的特点**：
* **使用二进制格式传输，更高效、更紧凑。** 
TTP 2.0 中所有加强性能的核心点在于此。在之前的 HTTP 版本中，我们是通过文本的方式传输数据。在 HTTP 2.0 中引入了新的编码机制，所有传输的数据都会被分割，并采用二进制格式编码。
* **对报头压缩，降低开销。** 
在 HTTP 1.X 中，我们使用文本的形式传输 header，在 header 携带 cookie 的情况下，可能每次都需要重复传输几百到几千的字节。

  在 HTTP 2.0 中，使用了 HPACK 压缩格式对传输的 header 进行编码，减少了 header 的大小。并在两端维护了索引表，用于记录出现过的 header ，后面在传输过程中就可以传输已经记录过的 header 的键名，对端收到数据后就可以通过键名找到对应的值。
* **多路复用，一个网络连接实现并行请求。**
 在 HTTP 2.0 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。

  帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。

  多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

* **服务器主动推送，减少请求的延迟 。**
在 HTTP 2.0 中，服务端可以在客户端某个请求后，主动推送其他资源。

  可以想象以下情况，某些资源客户端是一定会请求的，这时就可以采取服务端 push 的技术，提前给客户端推送必要的资源，这样就可以相对减少一点延迟时间。当然在浏览器兼容的情况下你也可以使用 prefetch 。
* **默认使用加密。**
##### 了解HTTP 3/QUIC
HTTP-over-QUIC被更名为HTTP 3 
HTTP 3与HTTP 1.1和HTTP 2没有直接的关系
*   该协议支持多路复用，虽然 HTTP 2.0 也支持多路复用，但是下层仍是 TCP，因为 TCP 的重传机制，只要一个包丢失就得判断丢失包并且重传，导致发生队头阻塞的问题，但是 UDP 没有这个机制
*   实现了自己的加密协议，通过类似 TCP 的 TFO 机制可以实现 0-RTT，当然 TLS 1.3 已经实现了 0-RTT 了
*   支持重传和纠错机制（向前恢复），在只丢失一个包的情况下不需要重传，使用纠错机制恢复丢失的包
    *   纠错机制：通过异或的方式，算出发出去的数据的异或值并单独发出一个包，服务端在发现有一个包丢失的情况下，通过其他数据包和异或值包算出丢失包
    *   在丢失两个包或以上的情况就使用重传机制，因为算不出来了

##### HTTP与反向代理
######正向代理
正向代理 是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。客户端必须要进行一些特别的设置才能使用正向代理。
用途：
（1）访问原来无法访问的资源，如google
（2） 可以做缓存，加速访问资源(服务器缓存要谨慎)
（3）对客户端访问授权，上网进行认证
（4）代理可以记录用户访问记录（上网行为管理），对外隐藏用户信息
![正向代理.png](https://upload-images.jianshu.io/upload_images/7728915-73a1c99a31b80f63.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
###### 反向代理
反向代理的用途：
* 加密和SSL加速 
* 负载均衡 
* 缓存静态内容 
* 压缩 
* 减速上传 （百度网盘上传下载文件）
* 安全 （黑客要先攻击代理服务器这第一道防线才能继续攻击我们内网的服务器拿到数据库口令）
* 外网发布


![image.png](https://upload-images.jianshu.io/upload_images/7728915-48ac98e3a2cec254.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

参考博文：https://yuchengkai.cn/docs/cs/#%E7%8A%B6%E6%80%81%E6%9C%BA
####Nginx安装及配置
* 环境：linux服务器，CentOS系统
http://www.runoob.com/linux/nginx-install-setup.html
![image.png](https://upload-images.jianshu.io/upload_images/7728915-dc7b088e95334311.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Nginx 配置时使用vi出现了一些问题，i 在光标前插入字符，要修改内容就要先输入i才能进行下一步操作。修改完成之后点击esc然后:wq就可以保存并退出了。

检查配置文件nginx.conf的正确性命令：
也成功了。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-3d2f5037d0d0f08b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
注意路径，注意安装版本。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-29ec6065e5a123f1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
遇到了一个困扰很久的问题：
[Nginx [emerg]: bind() to 0.0.0.0:80 failed (98: Address already in use)](https://www.cnblogs.com/toosuo/p/3571114.html)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-04e5595de54807a6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-7bfa96cdabda557c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
使用netstat -ltunp去看端口的使用情况。
发现是tcp在占用这个端口，直接使用命令关闭。
        
    sudo fuser -k 80/tcp

##### 怎么配反向代理
在sever前面加上
![image.png](https://upload-images.jianshu.io/upload_images/7728915-6981b13711f0e595.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
上图的意思就是反向代理到本机上面的8080端口。如果多加几个ip就能做负载均衡。
接下来进行设置：
location+反向代理的路径（这是用户输入的路径）
proxy_pass:后面一定要跟协议头（http://）proxy_pass后面的路径是真正要去的服务器。
注意：配置的时候一定要原封不动的将下面的这些都复制一波。
更加详细的可以看资料中文件。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-6bef88c3d6da585a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)