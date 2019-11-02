    const promise = new Promise((resolve,reject) => {
        console.log(1)
        resolve()
        console.log(2)
    })
    promise.then(()=> {
        console.log(3)
    })
    console.log(4)
    //1,2,4,3
    //Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的。


    const promise = new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('once');
            resolve('success')
        },1000)
    })

    const start = Date.now()
    promise.then((res) => {
        console.log(res,Date.now() - start)
    })

    promise.then((res) => {
        console.log(res,Date.now() - start)
    })
    //once 1005 1007


    Promise.resolve().then(() => {
        console.log('hahah')
        return new Error('error')
    })
    .then((res) => {
        console.log('then:',res)
    })
    .catch((err) => {
        console.log('catch:',err)
    })
    //hahah
    //then: Error: "error"


    const promise = Promise.resolve()
    .then(() => {
        return promise
    })
    promise.catch(console.error)
    //TypeError: Chaining cycle detected for promise #<Promise>
    //at <anonymous>
    //at process._tickCallback (internal/process/next_tick.js:188:7)
    //at Function.Module.runMain (module.js:667:11)
    //at startup (bootstrap_node.js:187:16)
    //at bootstrap_node.js:607:3


    Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)
    //1
    
    Promise.resolve()
    .then(function success (res) {
        throw new Error('error')
    }, function fail1 (e) {
        console.error('fail1: ', e)
    })
    .catch(function fail2 (e) {
        console.error('fail2: ', e)
    })
        //fail2:  Error: "error"
        //解释：.then 可以接收两个参数，第一个是处理成功的函数，第二个是处理错误的函数。
        //.catch 是 .then 第二个参数的简便写法，
        //但是它们用法上有一点需要注意：.then 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，
        //而后续的 .catch 可以捕获之前的错误。

        process.nextTick(() => {
            console.log('nextTick')
        })
        Promise.resolve()
        .then(() => {
            console.log('then')
        })
        setImmediate(() => {
            console.log('setImmediate')
        })
        console.log('end')