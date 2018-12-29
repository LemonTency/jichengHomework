1. babel转码
* 在项目安装babel-cli

        npm install --global babel-cli
* babel-cli 的基本用法

        # 转码结果输出到标准输出
        $ babel example.js

        # 转码结果写入一个文件
        # --out-file 或 -o 参数指定输出文件
        $ babel example.js --out-file compiled.js
        # 或者
        $ babel example.js -o compiled.js

* 建立Babel 的配置文件.babelrc，存放在项目的根目录下。使用 Babel 的第一步，就是配置这个文件。
**以下所有 Babel 工具和模块的使用，都必须先写好.babelrc**
该文件用来设置转码规则和插件，基本格式如下。

      {
      "presets": [],
      "plugins": []
      }

先利用npm进行安装

        # 最新转码规则
        $ npm install --save-dev babel-preset-latest

        # react 转码规则
        $ npm install --save-dev babel-preset-react

        # 不同阶段语法提案的转码规则（共有4个阶段），选装一个
        $ npm install --save-dev babel-preset-stage-0
        $ npm install --save-dev babel-preset-stage-1
        $ npm install --save-dev babel-preset-stage-2
        $ npm install --save-dev babel-preset-stage-3
然后在presets中对编码规则设置：
      "latest",
      "react",
      "stage-2"
*    执行转码
        
        babel index.js -o test.js
我们原本的index.js文件是下面这个样子的：

          let a = 1;
          console.log('aagagagag');
          class f{};
输出的test.js代码如下：

        'use strict';

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        var a = 1;
        console.log('aagagagag');

        var f = function f() {
          _classCallCheck(this, f);
        };

        ;

   上面这段代码好好感受一下~当this不在对应的构造器的时候是会报错的
*   上面代码是在全局环境下，进行 Babel 转码。这意味着，如果项目要运行，全局环境必须有 Babel，也就是说项目产生了对环境的依赖。另一方面，这样做也无法支持不同项目使用不同版本的 Babel。
解决方法是：
一个解决办法是将babel-cli安装在项目之中。

        $ npm install --save-dev babel-cli
然后，改写package.json。

        {
            // ...
          "devDependencies": {
            "babel-cli": "^6.0.0"
          },
          "scripts": {
            "build": "babel src -d lib"
          },
        }
转码的时候，就执行下面的命令。

        $ npm run build

* 还有shim和polyfill

  shim是一个库，将新的API引入到旧的环境中,而且仅靠旧环境中已有的手段实现

  一个polyfill就是一个用在浏览器API上的shim.我们通常的做法是先检查当前浏览器是否支持某个API, 如果不支持的话就加载对应的polyfill.然后新旧浏览器就都可以使用这个API了.