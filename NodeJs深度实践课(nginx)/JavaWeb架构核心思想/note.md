#### SSH （struts+spring+hibernate）
###### ASP.NET发展历程
* asp（active server page）时代，简单的输出html从Server到用户面前，出现了很多暴库漏洞。
* 无法布局化操作页面
* 扩展性受限
* ASP.NET出现了，革命性的拖拽控件时代，按钮事件直接操作服务器后台的时间，异步的操作区域。
* 同时可以开发PC软件，Web,编译型语言。
多层架构：
![image.png](https://upload-images.jianshu.io/upload_images/7728915-5056a63850106a0c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-7a2d097fceaae72b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###### JavaWeb发展历程

* jsp指令元素（import）
* jsp内置对象（session,request,response）
* javabean对象 可重用组件化思想
* 页面结构相当复杂，无前后端分离的概念

![image.png](https://upload-images.jianshu.io/upload_images/7728915-0809d3a84e7a4706.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-b29ed9286451b71c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

https://www.cnblogs.com/ldy-blogs/p/8479013.html
**IOC（控制反转）**：IOC就是控制反转，通俗的说就是我们不用自己创建实例对象，这些都交给Spring的bean工厂帮我们创建管理。这也是Spring的核心思想，通过面向接口编程的方式来是实现对业务组件的动态依赖。这就意味着IOC是Spring针对解决程序耦合而存在的。在实际应用中，Spring通过配置文件（xml或者properties）指定需要实例化的java类（类名的完整字符串），包括这些java类的一组初始化值，通过加载读取配置文件，用Spring提供的方法（getBean()）就可以获取到我们想要的根据指定配置进行初始化的实例对象。
**DI（依赖注入）**：全称为Dependency Injection，意思自身对象中的内置对象是通过注入的方式进行创建。
**那么IOC和DI这两者又是什么关系呢？**
IOC就是一种软件设计思想，DI是这种软件设计思想的一个实现。而Spring中的核心机制就是DI。

**AOP（面向切面）**就是将程序功能中的频繁出现或者与主业务逻辑代码相关度不高的代码抽离出来，通过切面编程的方式在想要调用的时候引入调用的思想。而这种思想并不是只限于Spring和java，AOP（面向切面）和OOP（面向对象）一样都是一种编程思想，这种思想的实现机制在Spring中便是应用了java的动态代理和java的反射。在实际编程中，我们通常会遇到一些交叉业务逻辑（比如：日志，事务，安全等等），这是我们就可以封装一个封面，然后注入到目标对象（具体的业务逻辑）中去。ps：很多方法都会抛出异常信息，这是我们就可以写一个拦截器，在这个类中实现记录错误日志的功能，再在Spring的xml配置文件中配置一个对这些要记录日志的方法的AOP拦截器，在这个方法执行后调用这个拦截器来记录日志。这样就不用每次抛出异常都要手动的去单独处理记录，提高了程序的内聚性。这种在调用某个方法之前/后想要自动执行一系列自定义操作的就是AOP思想。
Spring的AOP和IOC都是为了解决代码的耦合度的实际应用，使得代码的重用度变高，便于维护。但这些都不是Spring中特有的，我们可以说Spring将它们应用的更灵活。


前端工程构建工具http://fis.baidu.com/#

###### 根据项目实际建立一个这样的文件夹（运用了NET思想）

![image.png](https://upload-images.jianshu.io/upload_images/7728915-9960af65f002c2de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)