        var express = require('express');
        var app = express();
        var fs = require("fs");

        //添加的新用户数据
        var user = {
            "user4" : {
            "name" : "mohit",
            "password" : "password4",
            "profession" : "teacher",
            "id": 4
            }
        }
        var id = 2;
        //获取用户列表的接口
        //运行之后，在浏览器中访问 localhost:8081/listUsers
        app.get('/listUsers', function (req, res) {
        fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
            console.log( data );
            res.end( data );
        });
        })
        //增加用户的接口
        //运行之后，在浏览器中访问 localhost:8081/addUser
        app.get('/addUser',function(req,res){
            fs.readFile(__dirname + "/" + "users.json", 'utf8',function(err,data){
                data = JSON.parse(data);
                data["user4"] = user["user4"];
                console.log(data);
                res.end(JSON.stringify(data));
            });
        })

        //创建了 RESTful API :id（用户id）， 用于读取指定用户的详细信息
        //在浏览器中访问 localhost:8081/2就能得到对应ID的信息
        app.get('/:id',function(req,res){
            fs.readFile(__dirname + "/" + "users.json",'utf-8',function(err,data){
                data = JSON.parse(data);//转成JSON对象
                var user = data['user' + req.params.id];
                console.log(user);
                res.end(JSON.stringify(user));//装成字符串
            })
        })

        var server = app.listen(8081, function () {

        var host = server.address().address
        var port = server.address().port

        console.log("应用实例，访问地址为 http://%s:%s", host, port)

        })