
#### Vue架构概览

先来看看vue源码的结构吧！

要看源码，就肯定要看src的文件了。

src目录下的文件如下：


![](https://user-gold-cdn.xitu.io/2019/3/27/169bf552cae11aea?w=968&h=303&f=png&s=46974)

compiler： 编译模板

core：Vue.js的核心

entries：生产打包的入口

platforms：platforms目录下暂时至于web目录（在最新的开发目录里面已经有weex目录了）。web目录下有对应的/compiler,/runtime,/server,/util目录

server：处理服务端渲染

sfc：处理单文件.vue

shared：提供全局用到的工具函数

那么我们再来看看vue.js的核心core文件夹里面有什么内容：


![](https://user-gold-cdn.xitu.io/2019/3/27/169bf565d54bf223?w=981&h=376&f=png&s=59547)


components：模板编译的代码

global-api：最上层的文件接口

instance：生命周期——>init.js

observer：数据收集和订阅

util：常用工具方法类

vdom：虚拟dom

Vue.js的目标是通过尽可能简单的API实现相应的数据绑定和组合的视图组件。

(想办法去pr，主要是test测试用例)

#### 双向数据绑定及SetState原理

IE8以下不支持Vue,因为没有Object.definePropery。这个时候应该怎么办？

这个时候我们可以考虑使用Object.prototype.\_\_defineGetter__()

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__
但是该方法是非标准的！尽量不要在生产环境使用。


#### Vue Virtual Dom
#### Vue2 DOM Diff原理
#### Vue2 整体解析过程
#### Vue2运行时优化