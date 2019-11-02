function Promise(fn){
    var statr = 'pending',
    value = null,
    callbacks = [];

    this.then = function(onFulfilled){
        return new Promise(function(resolve){
            handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            });
        });
    };

    function handle(callback){
        if(state == 'pending'){
            callbacks.push(callback);
            return;
        }
        //如果then中没有传递任何东西
        if(!callback.onFulfilled){
            callback.resolve(value);
            return;
        }

        var ret = callback.onFulfilled(value);
        
        callback.resolve(ret);
    }

    function resolve(newValue){
        if(newValue && (typeof newValue === 'object'))
        
    }
}