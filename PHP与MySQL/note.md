1. PHP和面向对象
1.1 初识PHP
* 基本用法 

><?php
// PHP 代码
?>

   **PHP 中的每个代码行都必须以分号结束。分号是一种分隔符，用于把指令集区分开来。**
  **通过 PHP，有两种在浏览器输出文本的基础指令：echo 和 print。**

* 注释
单行注释： //
多行注释： /* */

* 变量
变量以 \$ 符号开始，后面跟着变量的名称

        <?php
        $txt="Hello world!";
        $x=5;
        $y=10.5;
        ?>

    PHP 有四种不同的变量作用域：local,global,static,parameter
在函数外部定义的变量，拥有全局作用域。要在一个函数中访问一个全局变量，需要使用 global 关键字。

        <?php
          $x=5;
          $y=10;
 
          function myTest()
          {
              global $x,$y;
              $y=$x+$y;
          }
 
        myTest();
        echo $y; // 输出 15
        ?>

  **当一个函数完成时，它的所有变量通常都会被删除。然而，有时候您希望某个局部变量不要被删除。
要做到这一点，请在您第一次声明变量时使用 static 关键字：**

  echo - 可以输出一个或多个字符串
print - 只允许输出一个字符串，返回值总为 1
提示：echo 输出的速度比 print 快， echo 没有返回值，print有返回值1。

* 超级全局变量
超级全局变量是PHP系统中自带的变量，在一个脚本的全部作用域中都可用。
**$GLOBALS**是PHP的一个超级全局变量组，在一个PHP脚本的全部作用域中都可以访问。


  **$GLOBALS**是一个包含了全部变量的全局组合数组。变量的名字就是数组的键。

        $a = 100;
        $b = 200;
        function test(){
        $GLOBALS['c'] = $GLOBALS['a'] + $GLOBALS['b'];
        }
        test();
        echo $c; //300

  **使用include 和require引入文件**
  首先需要一个a.php文件，里面定义了b这个变量

        <?php
            $b = 100;
        ?>
使用require_once引用

    <?php
        require_once("a.php");
        $a = "我是外面的";
        function test(){
            global $a;
            echo $GLOBALS['b'];
            echo $a;
        }
        test()  //100  我是外面的
    ?>

require() :无条件包含，如果文件不存在，会报出一个fatal error.脚本停止执行
**require遇到错误时，直接报错并停止运行程序**
include():遇到错误时（引用的文件不存在），PHP只是报错，但程序会继续运行下去

* PHP Session
PHP session 变量用于存储关于用户会话（session）的信息，或者更改用户会话（session）的设置。Session 变量存储单一用户的信息
**并且对于应用程序中的所有页面都是可用的**
启动会话session_start() 函数必须位于 <html> 标签之前：

  在一次会话中，我们打开了b.php


![image.png](https://upload-images.jianshu.io/upload_images/7728915-87fffc0cedbdd918.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-2c1758857d34e988.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

设置header为utf-8
header("Content-type: text/html; charset=utf-8"); 
GET请求就是把参数放在url上面
POST
![image.png](https://upload-images.jianshu.io/upload_images/7728915-54a2f98c4ddb46b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
记住，前后端用json来弄数据
![image.png](https://upload-images.jianshu.io/upload_images/7728915-60c7c3b07ad75c4d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


1.2 OO的概念解读以及Prototype
1.3 PHP和JavaScript的比较

2. PHP和MySql
PHPmyadmin
wamp中的phpmyadmin的账号是root ,密码是空

2.1 新建数据库
![image.png](https://upload-images.jianshu.io/upload_images/7728915-0f3f4cda335da51c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
2.2 进入对象数据库，新建表
![image.png](https://upload-images.jianshu.io/upload_images/7728915-b47c91a305b00664.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
索引是查找的时候需要用到的。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-a980fc8b1d6ed049.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
保存之后变成下面这个样子
![image.png](https://upload-images.jianshu.io/upload_images/7728915-de379a8154505fd8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-50139ccc5f75069d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-f84dca73ab6e1a52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
可以看到，我们的表已经有两条数据了。
数据库最最基础的增删改查操作。
查询：
SELECT * FROM 'news'  WHERE 1    
SELECT 'newsid', 'newstitle', 'newsimg', 'newscontent', 'addtime' FROM 'news' WHERE 1
增：
INSERT INTO 'news'('newsid', 'newstitle', 'newsimg', 'newscontent', 'addtime') VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]')
删：
DELETE FROM ’news‘ WHERE 0
改：
UPDATE 'news'SET 'newsid'='[value-1]','newstitle'='[value-2]','newsimg'='[value-3]','newscontent'='[value-4]','addtime'='[value-5] 'WHERE 1
2.3 PHP操作MySQL
* PHP连接 MySQL
  新建一个mysql.php

        <?php
        $servername = "localhost";
        $username = "root";
        $password = "";

        $conn = new mysqli($servername,$username,$password);

        if ($conn->connect_error){
            die("连接失败：".$conn->connect_error);
        }else{
            echo "连接成功";
        }
        ?>
在localhost打开mysql.php，就可以看到是连接成功还是失败了。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-bdc5e8d9625741c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






