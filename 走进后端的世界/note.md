1. 浏览器端+nodejs中间层=>大前端
![image.png](https://upload-images.jianshu.io/upload_images/7728915-2303a81dff87c85d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 前后端交互形式
更多的是采用RESTful风格的接口
如果一个架构符合REST原则，就称它为RESTful架构。
http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html
http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html
**REST（Representational State Transfer）**：表现层状态转化。在客户端和服务器之间通过状态转移来驱动应用状态的演进。
**表现层（Representation）**："资源"是一种信息实体，它可以有多种外在表现形式。我们把"资源"具体呈现出来的形式，叫做它的"表现"（Representation）。什么txt,json,xml这种都是的。在HTTP请求的头信息中用Accept和Content-Type字段指定的这两个字段才是对"表现层"的描述。
**状态转化（State Transfer）**： 互联网通信协议HTTP协议，是一个无状态协议。这意味着，所有的状态都保存在服务器端。因此，如果客户端层想要操作服务器，必须通过某种手段，让服务器端发生"状态转化"（State Transfer）。而这种转化是建立在表现层之上的，所以就是"表现层状态转化"。
客户端用到的手段，只能是HTTP协议。
 RESTful采用的http方法：
![image.png](https://upload-images.jianshu.io/upload_images/7728915-6f191cd39b9862ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


   **RESTful架构：**

　　（1）每一个URI代表一种资源；

　　（2）客户端和服务器之间，传递这种资源的某种表现层；

　　（3）客户端通过四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"。
3. 数据接口流程
![image.png](https://upload-images.jianshu.io/upload_images/7728915-56e34a356b5fa6b8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
好的接口文档
https://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI#.E7.B2.89.E4.B8.9D.E6.9C.8D.E5.8A.A1.E6.8E.A5.E5.8F.A3
4. 大前端相关数据
![image.png](https://upload-images.jianshu.io/upload_images/7728915-c97c3433f922c192.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5. 后端常用语言
5.1 **PHP**
![image.png](https://upload-images.jianshu.io/upload_images/7728915-4f09196f89e46c5d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
PHP是脚本语言，依靠脚PHP解释引擎，变量的生存周期是页面级的。
PHP在浏览器是跑不起来的。
**PHP应用范围**
* 网站
* CMS（内容管理系统，博客）
* 后台接口
* 与前端结合十分紧密
5.2 **Java**
![image.png](https://upload-images.jianshu.io/upload_images/7728915-5dd49ef8b1548f45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

        class Hello{
          public static void main(String args[]){
            System.out.println("hello world");
          }
        }
Java EE ==> 企业级应用
Java SE ==> 标准版应用
前端开发常用JSP
**Java应用范围**
* 大型网站前端与后端
* 后台服务
* 桌面程序
* 嵌入式
* 追求安全和稳定的商业系统
* 各种商业中间件
5.3 **C#**
 ![image.png](https://upload-images.jianshu.io/upload_images/7728915-d55c89048b45209d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
5.4 **python**
![image.png](https://upload-images.jianshu.io/upload_images/7728915-89cea056d62b9a02.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
属于胶水语言，解释型语言，可以嵌入到其他语言中，运行速度快。


**Python应用范围**
* Web开发
* 服务器端后台
* 图形，数学，文本处理功能强大
* 桌面程序
* 黑客比较喜欢这种语言

5.5 **go语言**
![image.png](https://upload-images.jianshu.io/upload_images/7728915-d955c9ac833a0314.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
编译和执行速度极快，静态类型语言
支持完全垃圾回收（java,c#内存回收），支持多核 CPU运算
非常适合后端大型程序

    packae main 
    import "fmt"
    func main(){
        fmt.Println("helloWorld")
    }



//建议第一学PHP，第二学python




