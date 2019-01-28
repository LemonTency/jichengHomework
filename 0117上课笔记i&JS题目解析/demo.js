//----------async await
        const timeout = ms =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                    }, ms);
                });
                const ajax1 = () =>
                    timeout(2000).then(() => {
                        console.log("1");
                        return 1;
                    });
                const ajax2 = () =>
                    timeout(1000).then(() => {
                       console.log("2");
                        return 2;
                    });
                const ajax3 = () =>
                    timeout(2000).then(() => {
                        console.log("3");
                        return 3;
                    });
                const mergePromise = (ajaxArray) =>{
                    async function test(){
                        let result = [];
                        for(let i of ajaxArray){
                            let item = await i();
                            result.push(item);
                        }
                        return result;
                    }
                    return test();
                    //1,2,3 done [1,2,3]
                    //【代码书写处】
                    } 

                mergePromise([ajax1, ajax2, ajax3]).then(data => {
                    console.log("done");
                    console.log(data); // data 为 [1, 2, 3]
                })

//------还可以使用另外一种方法，就是让把递归拉平的思路,也能得到想要的后果
        const timeout = ms =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
                }, ms);
            });
            const ajax1 = () =>
                timeout(2000).then(() => {
                    console.log("1");
                    return 1;
                });
            const ajax2 = () =>
                timeout(1000).then(() => {
                   console.log("2");
                    return 2;
                });
            const ajax3 = () =>
                timeout(2000).then(() => {
                    console.log("3");
                    return 3;
                });
            const mergePromise = async function(ajaxArray){
                let data = [];
                while(ajaxArray[0]){
                    await ajaxArray[0]().then(res => data.push(res),ajaxArray.shift())
                    }
                return data;
                }

            mergePromise([ajax1, ajax2, ajax3]).then(data => {
                console.log("done");
                console.log(data); // data 为 [1, 2, 3]
            })
//------------元编程之Symbol
        const arr = [2,3,4,5,6,7];
        arr[Symbol.iterator] = function* (){
                yield xx;
        }
        for(const x of arr){
            console.log(x)
        }

        //如果只想输出偶数位置的数字
        const arr = [2,3,4,5,6,7];
        arr[Symbol.iterator] = function* (){
            let idx = 1;
            console.table(this);
            do{
                yield this[idx];
            }while((idx += 2) < this.length)  
        }
        for(const x of arr){
            console.log(x)
        }
        //-----------关于Symbol
        const obj = {};
        let a = Symbol('a');
        let b = Symbol('b');

        obj[a] = 'Hello';
        obj[b] = 'World';

        const objectSymbols = Object.getOwnPropertySymbols(obj);
        console.log(objectSymbols)//[ Symbol(a), Symbol(b) ]
        //------------递归中的元编程
        function sum(x,total){
            console.trace();
            if( x === 1){
                return x + total;
                __TCO_ENABLED = true;
                //让浏览器强制开启尾递归优化
            }return sum(x - 1, x+total);
        }
        sum(5.0)
//-------按值和按地址引用
            var s = [];
            var arr = s;
            for (var i = 0; i < 3; i++) {
                var pusher = {
                    value: "item"+i
                },tmp;
                if (i !== 2) {
                    tmp = []
                    pusher.children = tmp
                }
                arr.push(pusher);
                arr = tmp;
            }
            console.log(s[0]);
            //[value:item0,children:[value:item1,children:[value:item2]]]