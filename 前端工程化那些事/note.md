#### 浅谈前端架构

可以用以下几个词来概括：
1. 统帅全局

让架构匹配业务，让所有人对架构方案信服。

2. 消息通讯

建立消息通讯机制，例如著名监听者模式，编写消息通讯的组件，让开发提高效率。

3. 插件随组

将很多东西抽象成组件，使系统更具扩展性。

4. 本地可调

在本地起服务，不受限于后端。永远不要相信后端。

5. 多端方案

安卓，ios，RN等。

6. 代码分模

将代码模块化，从Require进入import时代。

7. 雅虎军规

为性能而生，为用户体验而生。

8. 工业为先

尽量减少人工，使压缩，打包等都可以实现自动化。

9. 持续可扩

对系统要有长久的打算，公用文件，技术选型。

10. 一键部署

#### 小菜鸟的进阶之路

1. 初入江湖。

必须了解JS压缩，CSS压缩，IMG压缩，JS,CSS合并文件，文件MD5。
就拿最最最简单的静态文件说起。

[http://tool.oschina.net/jscompress/](http://tool.oschina.net/jscompress/)


2. 深不可测

渐渐的，你会发现

代码逻辑越来越复杂，单个JS文件过大，多页面重复引用相同资源导致重复加载，代码可重用性不高。


这个时候，你会想到用underscoce，backbone，pushstate+ajax+hash
sea.js模块化，less写样式

3. 返璞归真

基于Promise的nodejs
为什么说是返璞归真呢？因为你在后端输出HTML，与之前的JSP类似。

需要用到的技术有Node,KOA,EXPRESS,BABEL,PM2
