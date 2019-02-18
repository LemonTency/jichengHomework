#### 什么是反向代理与负载均衡

正向代理就是我们去访问谷歌的时候。
反向代理（Reverse Proxy）方式是指以代理服务器来接受Internet上的连接请求，然后将请求转发给内部网络上的服务器；并将从服务器上得到的结果返回给Internet上请求连接的客户端，此时代理服务器对外就表现为一个服务器。用户不知道是从内部网络上的哪个服务器返回的。

当一台服务器单位时间内访问量越大的时候，服务器的压力越大，当一台服务器夜里大得超过自身的承受能力的时候，服务器就会崩溃。为了避免服务器崩溃，让用户有更好的体验，我们通常通过负载均衡的方式来分担服务器的压力。那么什么是负载均衡呢？

负载均衡：我们可以建立很多个服务器，这些服务器组成一个服务器集群，然后当用户访问我们网站的时候，先访问一个中间服务器，再让这个中间服务器在服务器集群中选择一个压力较小的服务器，然后将该访问呢请求引入该选择的服务器。这样，用户的每次访问都会保证服务器集群中的每一个服务器的压力趋于平衡，分担了服务器压力，避免了服务器崩溃的情况。

#### Nginx负载均衡的实现

Nginx是一款可以反向代理实现负载均衡的服务器。使用Nginx服务实现负载均衡的时候。用户的访问首先会访问到Nginx服务器，然后Nginx服务器再从服务器集群表中现在压力较小的服务器，然后将该访问请求引向该服务器。若服务器集群中的某个服务器崩溃，那么从待选服务器列表中将改服务器删除。


#### HTTP upstream模块

相关资料：
http://tengine.taobao.org/book/chapter_5.html

* 什么是HTTP upstream模块
upstream（上游）模块是Nginx服务器的一个重要模块。Upstream模块实现在轮询和客户端ip之间实现后端的负载均衡。
upstream使nginx将跨越单机的限制，完成网络数据的接收、处理和转发。
* ip_hash模块
在负载均衡的系统中，如果用户在某台服务器上登陆，那么如果该用户第二次请求的时候，因为我们是负载均衡系统，每次请求都会重新定位到服务器集群中的一个服务器，那么如果此时如果将已经登陆服务器A的用户再定位到其他服务器，显然不妥。可以用ip_hash来解决这个问题，如果客户端意见访问了服务器A并且已经登陆，那么第二次请求的时候，会将改请求定位到该后端服务器中。
* server指令
主要用于指定服务器的名称和参数
* upstream指令及相关变量
主要用于设置一组可以在proxy_pass和fastcgi_pass指令中使用代理服务器，默认负载方式为轮询。


实战部分：
还是要记住自己的nginx是安装在什么地方。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-b4b96f7f920c9b51.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
在对应的usr/local/webserver/nginx/html/
里面有一个index.html（对应的就是我们服务器安装了nginx之后的首页）
用vi修改。
常见vi操作：
Nginx 配置时使用vi出现了一些问题，i 在光标前插入字符，要修改内容就要先输入i才能进行下一步操作。修改完成之后点击esc然后:wq就可以保存并退出了。
修改之后重启一下   nginx -s reload就可以看到我们的首页变了。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-19f89bf9c10f7271.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
修改index.html发现不生效，可能是修改错文件了。可以通过网页的Network来分析，看时间戳。

 下面就是我们和运维需要一起合作的 nginx.conf

    //几核就写几核
    worker_process 4;
    events{
        worker_connection:1024;
    }
    //可以使用的两个ip地址
    http{
        upstream firsttest{
            //加上ip_hash；让同一个客户每次定位到一个服务器上
            //server:192.168.0.31 weight=2;加上权重，出现server:192.168.0.31的几率会高一点。
            server:192.168.0.31,
            server:192.168.0.16
        }
        server{
            listen:8080;
            //将:8080或者 / 代理到http://firsttest
            location / {
                proxy_pass http://firsttest
            }
        }
    }

#### 小结
用硬件实现负载均衡，效率很高成本也高。用软件实现则相反，使用nginx实现负载均衡就是通过软件的方式来实现负载均衡，并且Nginx本身就支持高并发。