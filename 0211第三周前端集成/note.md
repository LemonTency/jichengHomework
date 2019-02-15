##### 什么是持续集成
**Continuous integration,简称CI.**持续集成
开发人员会频繁的提交代码到主干，这些代码在提交到主线之前都要经过编译和自动化测试流进行验证。保障代码在合并主干之后的质量问题，对可能出现的一些问题进行预警。
和运维的同学一起部署。
CI通过——QA测试
**Continuous Delivery,简称CD**持续交付
意味着除了自动化测试，我们还需要有自动化的发布流，以及通过一
个按键就可以随时随地实现应用的部署上线。 
只要CI，QA一过，就可以通过一个按键实现应用随时随地的部署上线。
**Continuous deployment]**持续部署
没有人为干预（没有一键部署按钮），只有当一个修改在工作流中构建失败才能阻止它部署到产品线。 
**为什么需要持续集成**
1. 持续集成是通过平台串联各个开发环节，实现和沉
淀工作自动化的方法。 
2. 线上代码和代码仓库不同步，影响迭代和团队协
作。 
3. 静态资源发布依赖人工，浪费开发人力。 
4. 缺少自动化测试，产品质量得不到保障。 
5. 文案简单修改上线，需要技术介入。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-b2bacd4f2d497a05.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
CI主要就是下面这个部分。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-8f74820270f8abb0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
当代码发生变更提交到gitlab的时候，就可以通过钩子将代码变更事件提交到CI系统，CI系统也就是构建平台，一些插件组成的系统，可以在上面写脚本，这是一个服务器，上面也可以安装很多软件，例如jenkins，同时这个服务器可以引用代码仓库的钩子，检测到一些代码变更事件之后就进行项目构建并且在内网部署，自动测试，提测通知。**最主要的就是在jenkins上面进行利用webpack/grunt等进行项目的构建并自动化的测试**，跑通之后将编译好的代码再交给QA和开发机。
**svn merge的重要性**
https://www.cnblogs.com/firstdream/p/5321366.html