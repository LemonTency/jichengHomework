// describe("测试基本函数的API",function(){
//     it("+1函数应用",function(){
//         expect(window.add(1)).toBe(5);
//         //断言
//     })
// })


describe("测试基本函数的API", function () {
    it("+1函数应用", function () {
        expect(add(1)).toBe(1);
        expect(add(2)).toBe(3);
    })
});