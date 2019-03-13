#### 远程登陆linux

##### windows

* putty Xshell  类似，不过putty是开源的，Xshell是商业性的。

* cmder终端环境下使用ssh命令

#### linux基本知识

##### 什么是home目录？
1、家目录是用户的/home目录，每个用户都有自己的文件夹
其分为两种情况
(1)、普通用户

    /home/haha (haha是设置的用户名，也可以自己设置)
(2)、root用户

    /root
直接在命令行敲cd 就会进入到当前用户的home目录下。
2. 根目录是指最上层的目录，即“/”
根目录下有很多目录：

dev  home  lib64  mnt    opt   root  sbin  sys  usr
boot  etc  lib   media  newFS  proc  run   srv   tmp  var
3. 如何进行普通用户和root用户的切换

 普通用户→root用户

      su root 输入密码

  root用户→普通用户

      su haha(haha为用户名)

##### 重要linux命令

1. 行编辑器 vi/vim 

基本上 vi/vim 共分为三种模式，分别是命令模式（Command mode），输入模式（Insert mode）和底线命令模式（Last line mode）。 这三种模式的作用分别是：

**命令模式：**
用户刚刚启动 vi/vim，便进入了命令模式。

此状态下敲击键盘动作会被Vim识别为命令，而非输入字符。比如我们此时按下i，并不会输入一个字符，i被当作了一个命令。

以下是常用的几个命令：

i 切换到输入模式，以输入字符。
x 删除当前光标所在处的字符。
: 切换到底线命令模式，以在最底一行输入命令。

也就是说，**若想要编辑文本：启动Vim，进入了命令模式，按下i，切换到输入模式。**

**输入模式**
在命令模式下按下i就进入了输入模式。

ESC，退出输入模式，切换到命令模式

**底线模式**

在命令模式下按下:（英文冒号）就进入了底线命令模式。

底线命令模式可以输入单个或多个字符的命令，可用的命令非常多。

一般用  w (保存文件)  q(退出程序)

![image.png](https://upload-images.jianshu.io/upload_images/7728915-0f3bf3b9bbcad65a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

密密麻麻的有点恐怖。

2. 服务管理命令 systemctl 

拿httpd.service来举例：

systemctl start httpd.service 启动httpd.service服务
systemctl enable nfs-server.service  设置httpd.service服务开机自启动
systemctl disable nfs-server.service  设置httpd.service服务停止开机自启动
systemctl status nfs-server.service   查看服务当前状态
systemctl stop nfs-server.service 停止httpd.service服务
systemctl 查看所有服务

3. 网络管理命令 ifconfig、ip命令、router 

**ifconfig(interface config)**
一般就用ipconfig来查看一些ip地址等的信息，其他的详细内容可以参考博文：https://www.cnblogs.com/mmx8861/p/9277108.html

**ip**
ip命令其实是一个网络配置工具箱。linux的ip命令和ifconfig类似，但前者功能更强大，并旨在取代后者。 
ip addr  查看ip地址
其他详细内容可以参考博文：
https://linux.cn/article-3144-1.html

**router**

使用route 命令可以查看 Linux 内核路由表。

![image.png](https://upload-images.jianshu.io/upload_images/7728915-dd893522747f3f91.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
rooute命令的输出项说明


Destination	目标网段或者主机
Gateway	   网关地址， ”*” 表示目标是本主机所属的网络，不需要路由
Genmask	网络掩码
Iface	该路由表项对应的输出接口

4. 命令行下载命令 curl、wget 


wget -c url  加了-c  断点续传，对于我们下载大文件时突然由于网络等原因中断非常有帮助，我们可以继续接着下载而不是重新下载一个文件。需要继续中断的下载时可以使用-c参数。 

5. 怎样查看Linux命令的帮助

xxx(某某命令)  -h
就会把一些相关参数和具体应用都显示出来。
 man xxx(某某命令)

6. 查看服务器系统信息

 lsb release -a 
7. 在终端下不小心ctrl+s了怎么办？

ctrl+s实际上是把终端挂起了，这个时候只需要ctrl+q就行了。

**一些常见的快捷方式**

ctrl+c 结束正在运行的程序【ping、telnet等】 
ctrl+d 结束输入或退出shell 
ctrl+s 暂停屏幕输出 
ctrl+q 恢复屏幕输出 
ctrl+l 清屏，等同于Clear 
ctrl+a/ctrl+e 快速移动光标到行首/行尾

#### 进程 线程 协程

一篇比较好的讲解进程和线程的博文：
http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html

* 双击了一个exe，就产生了一个进程。
进程的目的就是担当分配系统资源（CPU时间、内存）的实体
进程需要进行一系列的运算。如果CPU是单核的，那么每次只能运行一个进程。（一核同一时间能运行一个进程）

* 线程是操作系统能够进行运算调度的最小单位 。

* 协程是一种用户态的轻量级线程，无法利用多核资源。正如一个进程可以拥有多个线程一样，一个线程也可以拥有多个协程。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-65cc004910a083ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

* IO密集型应用的发展：多进程->多线程->事件驱动->协程。IO密集型的任务一般涉及网络，磁盘IO。大部分时间都在等待IO操作完成（因为IO的速度远远低于CPU和内存的速度）。对于IO密集型任务，任务越多，CPU效率越高，但也有一个限度。常见的大部分任务都是IO密集型任务，比如Web应用。
IO密集型应用的发展: 多进程->多线程->事件驱动->协程

* CPU密集型（计算密集型）：消耗CPU资源，比如计算圆周率、对视频进行高清解码等任务。
CPU密集型程序适合C语言多线程，I/O密集型适合脚本语言开发的多线程。
CPU密集型应用的发展:多进程->多线程 

* 调度和切换的时间：进程 > 线程 > 协程

* Linux探秘之用户态和内核态
https://www.cnblogs.com/bakari/p/5520860.html
![Unix/Linux的体系架构.png](https://upload-images.jianshu.io/upload_images/7728915-56727aea58896b5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
如上图所示，从宏观上来看，Linux操作系统的体系架构分为`用户态`和`内核态`（或者用户空间和内核）。内核从本质上看是一种软件——控制计算机的硬件资源，并提供上层应用程序运行的环境。**用户态即上层应用程序的活动空间**，应用程序的执行必须依托于内核提供的资源，包括CPU资源、存储资源、I/O资源等。为了使上层应用能够访问到这些资源，内核必须为上层应用提供访问的接口：即系统调用。

  Shell是一个特殊的应用程序，俗称命令行，本质上是一个命令解释器，它下通系统调用，上通各种应用，通常充当着一种“胶水”的角色，来连接各个小功能程序，让不同程序能够以一个清晰的接口协同工作，从而增强各个程序的功能。同时，Shell是可编程的，它可以执行符合Shell语法的文本，这样的文本称为Shell脚本，通常短短的几行Shell脚本就可以实现一个非常大的功能，原因就是这些Shell语句通常都对系统调用做了一层封装。为了方便用户和系统交互，一般，一个Shell对应一个终端，终端是一个硬件设备，呈现给用户的是一个图形化窗口。我们可以通过这个窗口输入或者输出文本。这个文本直接传递给shell进行分析解释，然后执行。

* 总结
操作系统的设计，可以归结为三点： 
1、以多进程形式，允许多个任务同时运行； 
2、以多线程形式，允许单个任务分成不同的部分运行； 
3、提供协调机制，一方面防止进程之间和线程之间产生冲突，另一方面允许进程之间和线程之间共享资源
4、进程和线程的资源共享如下图：
![image.png](https://upload-images.jianshu.io/upload_images/7728915-9034121270681a2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### Linux进程管理相关命令

1. top 命令详解 

top命令是Linux下常用的性能分析工具，能够实时显示系统中各个进程的资源占用状况top，相当于windows下面的资源管理器。

https://www.cnblogs.com/sunshuhai/p/6250514.html
2. ps 命令 详解

ps是显示瞬间进程的状态，并不动态连续；如果想对进程进行实时监控应该用top命令。

请强行记住**ps aux**这个命令行组合显示所有包含其他使用者的行程
http://www.runoob.com/linux/linux-comm-ps.html

1号进程是所有其他进程的父进程，所以不能被杀掉。
一旦杀死了父进程，系统就会崩溃。

grep是筛选命令使用正则表达式搜索文本，匹配你要找的进程

ps aux | grep sshd   查到sshd的进程

![image.png](https://upload-images.jianshu.io/upload_images/7728915-fe2d80d00977de4b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

最后一行包括了grep的不需要管，因为这是因为我们的搜索才存在的进程。
既然有两个进程，我们就应该区分哪一个是子进程，哪一个是父进程，杀死进程的时候只要杀父进程，子进程也会跟着完蛋。（**哪个PID小哪个就最有可能是父进程**）

详情可以参考博文：
https://www.cnblogs.com/robertoji/p/5555449.html
3. kill、pkill 命令及使用注意事项 

kill PID  杀死进程
kill -9 PID  彻底杀死进程

kill像linux操作系统发信号，9号信号就是强制关闭一个进程，不加-9就是让进程自行退出。

4. w 命令 

w是who的简写，显示当前用户


##### Linux网络管理相关命令

1. 查看和配置网络基本信息 ifconfig、ip 

2. 重启网卡 

3. 查看路由配置 router 

4. 排查网络故障 traceroute

Linux traceroute命令用于显示数据包到主机间的路径。（追踪通信过程中经过的路由）
traceroute指令让你追踪网络数据包的路由途径，预设数据包大小是40Bytes，用户可另行设置。

**5. 怎样找到占用网络端口的进程** 
 ss命令、netstat命令
ss命令与netstat类似
 ss -an  : 端口也可以一起显示（ -a:  all， -n:  numeric         【不解析服务名称】-p:  progress【查看使用某个网络端口号的进程】）

如果要查找使用22端口的进程应该怎么做？

ss -anp | grep :22
就能得到我们要的进程了。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-9768cb7cd807084f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 附录
linux命令大全
http://www.runoob.com/linux/linux-command-manual.html

