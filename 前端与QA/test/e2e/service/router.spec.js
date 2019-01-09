const axios = require("axios");
describe("node接口测试",function(){
    it("test接口测试",function(done){
        axios.get("http://localhost:3000/test")
        .then(function(response){
            if(response.data.result == "Hello !"){
                done();
            }else{
                done(new Error("请求接口数据出错"))
            }
        })
        .catch(function(error){
            done(error);
        })
    });
});
