### 单元测试(unit test)
* 目的： 让开发者知道代码结果
* 原则： 单一职责，接口抽象，层次抽离
* 相关概念
1. TDD
TDD是测试驱动开发（Test-Driven Development），一种测试风格，关注的是所有的功能是否被实现（每一个功能都必须有对应的测试用例）。suite配合test利用assert('tobi' == user.name)

2. BDD
行为驱动开发（Behavior Driven Development）,另外一种测试风格，关注整体行为是否符合整体预期，编写的每一行代码都有目的提供一个全面的测试用例集。
3. 断言库
保证最小单位是否正常运行检测方法。

* 单元测试框架
better-assert(TDD断言库）
should.js(BDD断言库）
expect.js(BDD断言库）
chai.js(TDD BDD双模）
Jasmin.js(BDD断言库）
Nodejs本身集成require("assert")
Intern更是一个大而全的单元测试框架
QUnit 一个游离在jQuery左右的测试框架
* 单元测试运行流程

![image.png](https://upload-images.jianshu.io/upload_images/7728915-29d1d96cc2d3083b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们主要就是在it这个地方进行编程。

### 性能测试
* 基准测试： 面向切面的编程AOP无侵入式统计（不切入人家的代码）
* Benchmark基准测试方法。
* 压力测试及相关概念
系统的响应时间，并发数，QPS与吞吐率紧紧关联。
响应时间：客户端向服务器建立连接时间，服务器端处理请求时间，等待报文响应时间。
并发用户数：指在某一时刻同时向服务器发送请求的用户总数。
QPS（TPS）：每秒钟request/事务 
当PV每天几十万或上百万就需要考虑压力测试。
PV：网站当日访问人数。（用户打开/刷新一次就记录，一人可以多次）
UV：独立访问人数。（以cookie为依据，一人一天只能算作一次）
QPS = PV/t
**100万个集中在10个小时，求服务器的QPS。**
QPS = PV/t = 1000000/10*60*60 = 27.7个/s
 
常见压力测试工具： ab, siege,http_load

### 安全测试
* 安全漏洞检查： XSS，SQL，CSRF

### 功能测试

* 用户真实性测试
用户测试是以用户为中心设计流程中的一种设计验证方法。通过观察和询问用户（被测试者），记录产品的真实使用情况，界定出可用性问题。本文主要介绍用户测试的基本步骤，目的是让不太熟悉用户测试的设计师对用户测试有一个基本概念。
* 冒烟测试（Smoke Test)：自由测试的一种。就是在每日build（构建版本）建立后，对系统的**基本功能**进行简单的测试。这种测试强调程序的主要功能进行的验证，而不会对具体功能进行更深入的测试。
* 回归测试：修改一处对整体功能都测试，一般配合自动化测试。

### 实战
#### 自动化单元测试
1. 建立package包管理文件

        npm init (然后一直回车到底）
    发现在对应的文件夹有一个package.json文件
2. 单元测试我们采用karma集成测试环境。

        npm install karma --save-dev
   **将package中的test修改为"karma init"**
    然后执行

        npm run test

    之后分别选择jasmine,no,phantomJs(无头浏览器，但是看不到界面，通过命令在浏览器进行操作）

    操作完成之后我们就可以看到我们的karma.conf.js配置文件了。
    使用phantomjs浏览器的话我们需要将配置文件下面这里的singleRun改为true。

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,
    对于这个package.json的设置，

          "scripts": {
            "test": "karma init"
          },
    如果我们更改成下面这个样子

        "scripts": {
          "test": "npm run prod && npm run dev",
          "prod": "echo 11",
          "dev": "echo 22"
        },
    执行

        npm run test
    我们可以看到：
![image.png](https://upload-images.jianshu.io/upload_images/7728915-d32e081813baa02d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
&&连接起来的是串行的运行的方式。
&连接起来的是并行的运行的方式。
将script进行更改。

        "scripts": {
          "test": "npm run prod & npm run dev",
          "prod": "echo 11",
          "dev": "echo 22"
        },
    我们可以看到  echo11 echo22是同时进行的。

3. 在yd-test文件夹下面新建unit文件夹。unit下面新建一个index.js和一个index.spec.js（测试文件）。
index.js:

        window.add = function(a){
          return a+1;
        }
    index.spec.js：

         describe("测试基本函数的API",function(){
            it("+1函数应用",function(){
                expect(window.add(1)).toBe(2);
                //断言
            })
        })
    将index.js和index.spec.js建立联系：
    在karma.conf,js中设置

        // 需要添加的测试文件
        files: [
          "./unit/**/*.js",
          "./unit/**/*.spec.js"
        ],

    安装依赖
    karma-jasmine是断言库jasmine-core是启动断言库的。
    
        cnpm install karma-jasmine jasmine-core --save-dev
        npm install karma-phantomjs-launcher --save-dev
        npm install phantom --save-dev
    在package.json里面设置    

        "unit": "karma start",
    然后就激动人心的时刻了！
        
        npm run unit
    我们可以看到，流下了幸福的泪水。

    ![image.png](https://upload-images.jianshu.io/upload_images/7728915-a0c4182e13293a01.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    此时，如果我们把index.spec.js修改为

        describe("测试基本函数的API",function(){
         it("+1函数应用",function(){
           expect(window.add(1)).toBe(3);
           //断言
         })
     })
    可以看到，这个单元测试并没有通过。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-f82ac3f447c67769.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 测试分支
   将index.js修改成

        window.add = function(a){
          if(a == 1){
            return 1;
          }else{
            return a+1;
          }
        }
    将index.spec.js修改为

        describe("测试基本函数的API", function () {
          it("+1函数应用", function () {
            expect(window.add(1)).toBe(1);
           })
         });
        
    安装karma-coverage，karma-coverage是一个神奇的东西，可以将测试的覆盖率及其报告生成对应的html，给团队其他成员看。

         cnpm install karma-coverage --save-dev
     
    根据这里的https://www.npmjs.com/package/karma-coverage进行配置
    主要配置的地方如下：

        preprocessors: {
          'unit/**/*.js': ['coverage']
        },
        coverageReporter: {
          type : 'html',
          dir : 'docs/coverage/'
          //前面没有加斜杠表示当前路径或者写成./docs/coverage也可以
        },//整个新增
        reporters: ['progress','coverage'],

    然后执行

        npm run unit
     打开对应的coverage文件夹之后可以看到有一些文件。打开相对应的index,html就可以看到我们的测试的覆盖结果了！
![image.png](https://upload-images.jianshu.io/upload_images/7728915-7eff2b716b744670.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    可以看到我们只覆盖了一半的分支，当我们点击unit进去的时候还可以看到相对应的没有测到的代码。
    更改一下index.spec.js，加上另外一个语句，测试到else的那一个分支

        expect(window.add(2)).toBe(3);
    再次运行，完美~~~
![image.png](https://upload-images.jianshu.io/upload_images/7728915-0046a564be23f4e2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

   **the end:问题汇总：**
       1.   [karma Executed 0 of 0 ERROR](https://segmentfault.com/q/1010000011773389)
        一直在想，咋回事呢？因为karma.conf.js里的files没有吧test目录下的js引入啊。所以没有跑case。原来是刚刚出现问题的时候我把路径改了一下。再修改回来就可以了

   2.   刚开始run的时候一直没有成功，一直报错
    This is probably not a problem with npm. There is likely additional logging output above.
后面看到了一篇博文，主要是可能由于种种版本更新的原因，先试一下

        npm install 
    还是不行的话，需要将所有原来的node_modules删除掉就可以了。
        
        rm -rf node_modules

        npm install

#### e2e （end to end）selenium-webdriver页面测试
1. 安装selenium-webdriver

         npm install selenium-webdriver
  
2. 新建e2e文件夹，在此文件夹下面建立一个baidu.spec,js文件。将https://www.npmjs.com/package/selenium-webdriver中的usage中的那段代码拷贝到Js文件并进行修改
假设我们要测试百度的搜索框输入大红袍之后的页面是否像我们所预测的那样进行渲染。

        const {Builder, By, Key, until} = require('selenium-webdriver');

        (async function example() {
          let driver = await new Builder().forBrowser('firefox').build();
          try {
            await driver.get('http://www.baidu.com/');
            await driver.findElement(By.name('wd')).sendKeys('大红袍', Key.RETURN);
            await driver.wait(until.titleIs('大红袍_百度搜索'));
          } finally {
            await driver.quit();
            //一定要退出
          }
        })();
    然后要在https://www.npmjs.com/package/selenium-webdriver中下载相对应的驱动放在我们的文件夹里。
    然后我们在package.json中的script进行设置

        "e2e": "node ./e2e/baidu.spec.js"
   执行
    
        npm run  e2e
   然后神奇的事情就会发生，**会自动打开浏览器并模拟输入大红袍的那个过程。**

3. 其他框架
   nightwatch(适用于大型项目)

    关于npm 的生命周期，假设有prod: "echo 22",我们在代码中加入preprod:"echo 11",当我们执行npm run prod的时候，我们可以看到我们的echo 11也执行了。

**问题汇总**
1. 运行的时候报错：Selenium::WebDriver::Error::UnknownError: newSession。
原来是下载的驱动版本不对。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-5cb4da1cc43e208e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2. 遇到了这样的一个错误
 ![image.png](https://upload-images.jianshu.io/upload_images/7728915-79c373420aed212f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
把.wait后面的逗号哪里的时间去掉就可以了。

#### rize测试框架
Rize 是一个提供顶层的、流畅并且可以链式调用的 API 的库，它能让您简单地使用 puppeteer。
换句话说，Rize就是对puppeteer的一个高度封装，使用起来特别的方便快捷容易上手。

1. 安装Rize,用了cnpm去安装，是ok的

        npm install --save-dev puppeteer rize
        npm install --save-dev @types/puppeteer

2. 按照https://rize.js.org/zh-CN/#%E5%AE%89%E8%A3%85的指示，创建一个实例对象rize,

        const Rize = require('rize')
        const rize = new Rize()
    并且新建一个github.spec.js测试文件，

        const Rize = require('rize')
        const rize = new Rize()

        rize
          .goto('https://github.com/')
          .type('input.header-search-input', 'node')
          .press('Enter')
          .waitForNavigation()
          .assertSee('Node.js')
          .end()  // 别忘了调用 `end` 方法来退出浏览器！

    我们来测试一下在github搜索框输入node是否会出现预期的效果，如果与我们预期相同 ，终端是没有提示的，但是如果出现了错误就会出现提示。

    在package.json中进行设置，我这里单独给设置了

       "e2ee": "node ./e2e/github.spec.js"
    执行

        npm run e2e
    可以看到终端并没有任何提示。说明验证成功，稍微修改一下再执行一下就可以看到提示错误。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-8cace9aa6d65b690.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    也可以直接让e2e同时跑多个测试文件，只需要

        "e2e": "node ./e2e/*.spec.js"

#### F2e测试解决方案
https://f2etest.net/
https://github.com/alibaba/f2etest
http://shaofan.org/f2etest/
http://shaofan.org/ui-recorder/

#### UI测试
backstop，phantmCss都是很不错的工具。
我们下面使用backstop来进行UI测试。

1. 安装backstop并初始化

        npm install -g backstopjs
        backstopjs init
    可以看到，当init之后在项目目录下面会多出一个backstop_data的文件夹，文件夹里面有个enigne_script，下面有这三个文件夹
![image.png](https://upload-images.jianshu.io/upload_images/7728915-b8a4aa94ef111f30.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    cookie.json用来存放一些登录信息。（涉及到验证cookie的时候一定要在这里进行设置）
    casper是核心的文件。
还有一个backstop.json配置文件。backstop.json的viewport可以调分辨率。
       
       "scenarios": [
        {
          "label": "qqmap",
          "cookiePath": "backstop_data/engine_scripts/cookies.json",
          "url": "https://map.qq.com/m/",
        }
2. 要匹配的UI图应该放在对应的bitmaps_reference，起的名字要符合backsto规范哦。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-e1bf59e30da2ab2b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    可以配置一下输出的文档：也就是html_report后面的一些参数。
    然后执行一下

        backstop test
    就可以看到一些输出的信息，还能在相对应的文件夹里面看到index.html，看到比对的结果。

   ![image.png](https://upload-images.jianshu.io/upload_images/7728915-43117ff166a177b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    **问题汇总**
    1. 执行backstop  test （没有参考图片的时候）,经过执行之后会把两个页面的不同标注出来。经过执行之后会生成bitmaps_reference这个文件夹。而在bitmaps_test文件夹里面则存放着我们要比对的页面的图片。

    2. 可以自己定义bitmaps_reference的图片，即自定义参照图片，就是，把UI的图，直接放在这里面，但是有一点需要注意的是，图片的命名需要准守backstop的起名规则，可以把test之后生成的图片名（bitmaps_test文件夹）直接复制命名给你的UI图片（不然可是会找不到的哦）

        参考博文： https://www.cnblogs.com/xumqfaith/p/8108784.html


####接口测试
mochaRunner.js\
![image.png](https://upload-images.jianshu.io/upload_images/7728915-f11d4245b20678aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/7728915-bdd36b6034fd98db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
1. 安装express(全局安装），开启服务，等下才能调接口
http://www.expressjs.com.cn/

       npm install express --save
    test.js

        const express = require('express')
        const app = express()

        app.get('/test', (req, res) => res.send({
            result:'Hello World!'
        }))

        app.listen(3000, () => console.log('Example app listening on port 3000!'))
    执行
    
        node test.js    
    在浏览器中输入localhost:3000/test(test对应上面的app.get('test'))就可以看到返回的结果了。

![image.png](https://upload-images.jianshu.io/upload_images/7728915-384ed05c5b505bb3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

   安装mocha

        npm install mocha
   安装mochawesome

        npm install --save-dev mochawesome
    mochawesome-report生成覆盖测试的文件
2. 新建service文件夹并新建router.spec.js测试文件。安装axios插件。

        npm install axios

        const axios = require("axios");

        describe("node接口测试",function(done){
            it("test接口测试",function(){
                axios.get("localhost:3000").then(function(res){
            if(res.data.result == "helloworld"){
                done(res);
            }else{
                done(new Error("数据"));
            }
        }).catch(function(error){
            done(error);
         })
        })
        })

3. 新建mochaRunner.js（添加相关测试文件）在https://mochajs.org/有示例代码。对代码进行修改就可以用啦。

         const Mocha = require("mocha");
         const mocha = new Mocha({
            reporter: 'mochawesome',
            reporterOptions:{
                reportDir:"./docs/mochawesome-report"
            }
        });
        mocha.addFile("./service/router.spec.js");
        mocha.run(function (errLength) {
             if (errLength == 0) {
              process.exit();
            } else {
                console.log("出错长度", errLength);
                process.exit(1);
            }
        })
4. 设置package.json中进行设置

        "service": "node ./mochaRunner"
   执行

          npm run service

    就可以看到测试结果，还能看到相对应的测试报告。

    **npm-run-all**
A CLI tool to run multiple npm-scripts in parallel or sequential.
像我们上面unit,e2e ui这些命令都可以一起跑，就方便快捷多了。

        “test”:"npm-run-all unit e2e ui service"
    然后直接执行npm run test就可以把所有的测试都一起跑了！！
但是这种方式有个问题，一旦其中一个测试用例有一个问题，所有的测试就会停止了。
所以如果我们修改为

        “test”:"npm-run-all --parallel unit e2e ui service"
    有一个问题就会先跳过这个问题，其他的测试还会继续进行。