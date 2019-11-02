    function Promise(){
        var promise = this,
        value = null;
        promise._resolves = [];
        promise._status = 'PENDING';

        //onFulfilled是then后面跟的回调函数
        this.then = function(onFulfilled){
            if(promise._status === 'PENDING'){
                promise._resolves.push(onFulfilled);
                return this;
            }
            //value是resolve传进来的参数
            //如果状态不是pending的话就会直接执行then里面的回调函数
            onFulfilled(value);
            return this;
        }
        
        function resolve(value){
            setTimeout(function(){
                promise._status = 'FULFILLED';
                promise._resolves.foreach(function(callback){
                    callback(value)
                })
            },0)
        }

        fn(resolve);
    }