
//链式支持

function Promise(fn) {
    var promise = this,
        value = null;
        promise._resolves = [];

    this.then = function (onFulfilled) {
        promise._resolves.push(onFulfilled);
        return this;
    };

    //延时
    //主要是为了防止如果在then方法注册回调之前，resolve就执行了
    
    function resolve(value) {
        setTimeout(function() {
            promise._resolves.forEach(function (callback) {
                callback(value);
            });
        },0);
    }

    fn(resolve);
}
