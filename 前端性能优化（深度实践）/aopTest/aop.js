    function test(){
        alert(2);
    }
//你要统计一下当前所有的函数谁耗时最长
//最最最简单的方法就是在alert(2)之前插入统计开始时间start的代码，之后统计结束时间end的代码
//所以需要相处一套无切入的方法。
    Function.prototype.before = function(fn){
        //__self保存这个函数
        var __self = this;
        return function(){
            fn.apply(this,arguments);
            __self.apply(__self,arguments)
        }
    }

    Function.prototype.after = function(fn){
        var __self = this;
        return function(){
            __self.apply(__self,arguments);
            fn.apply(this,arguments)
        }
    }
    //默认函数被执行2遍，test作为中转
    //before回调和before一起送到after
    //after after和test一起送到before
    //重点就在于挂载 self => test 执行before回调 执行self

    test.before(function(){
        alert(1)
    }).after(function(){
        alert(3)
    })()



