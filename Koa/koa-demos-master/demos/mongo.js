var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");//连接名为test的数据库名
mongoose.connection.once("open",function () {
    console.log("数据库连接了");
})
//2、将mongoose.Schema 赋值给一个变量
var Schema = mongoose.Schema;

//3、创建schema
var userSchema=new Schema({
    name:String,
    password:String
});

//4、根据schema，创建model
var userModel=mongoose.model("users",userSchema);

//5、根据schema约束，插入数据
//插入
userModel.create({
    name:"55开",
    password:"kaigua"
},function (err) {
    if(!err){
        console.log("插入成功");
    }
});

//查询
userModel.find({name:'55开'},function(err,docs){
    if(!err){
        console.log(docs);
    }
})


//修改
userModel.updateMany({name:'55开'},{$set:{password:'nishiyigedashabi'}},function(err){
    if(!err){
        console.log('修改成功');
    }
})

//删除
userModel.deleteMany({name:"55开"},function (err) {
    if(!err){
        console.log("删除成功");
    }
});

