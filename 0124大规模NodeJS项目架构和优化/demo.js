    //-------请说出下面代码运行结果并解释原因   
       setTimeout(function () {
        console.log(1);
        }, 0);
        setImmediate(function () {
        console.log(2);
        });
        process.nextTick(() => {
        console.log(3);
        });
        new Promise((resovle,reject)=>{
        console.log(4);
        resovle(4);
        }).then(function(){
        console.log(5);
        });
        console.log(6);

    //---------NodeJS怎么实现一个sleep
        async function test() {
            console.log('Hello')
            await sleep(1000)
            console.log('world!')
        }
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        } 
        test()

