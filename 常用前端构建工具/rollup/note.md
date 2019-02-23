https://github.com/rollup/rollup
参考博文：https://www.cnblogs.com/vajoy/p/5518442.html

#### 主要特性：
Tree-shaking
除了使用 ES6 模块之外，Rollup 还静态分析代码中的 import，并将排除任何未实际使用的代码。这允许您架构于现有工具和模块之上，而不会增加额外的依赖或使项目的大小膨胀。

看我们下面的例子
main.js

    import {cube} from './maths.js'

    console.log(cube(10))
maths,js

    import {cube} from './maths.js'

    console.log(cube(10))
rollup.config.js

    export default {
        input: 'src/main.js',
        output: {
          file: 'bundle.js',
          format: 'cjs'
        }
      };
执行rollup -c打包出来的bundle.js文件如下


    'use strict';

    function cube(x){
        return x*x*x;
    }

    console.log(cube(10));

https://segmentfault.com/a/1190000009932242

开启 sourcemaps 有两种方式：

使用命令行参数 --sourcemap

在配置文件中增加 sourceMap: true


    export default {
        entry: 'src/main.js',
        format: 'umd',
        dest: 'bundle.js',
        sourceMap: true
    }






