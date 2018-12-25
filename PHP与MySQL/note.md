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


1.2 OO的概念解读以及Prototype

  1.2.1 面向对象的产生

软件危机（开发和维护过程中遇到的一系列严重问题）——>软件工程学——>软件开发的方法（面向对象）
面向对象编程（OOP）：达到了软件工程的三个目标：重用性，灵活性，扩展性。让代码更简洁更容易维护。
OOP面向对象编程的特点：封装，继承，多态。
1.2.2 类与对象的关系
类是对象的抽象，而对象是类的具体实例。类——>人，对象——>张三。
1.2.3 面向对象的特性
面向对象的三个特性：
对象的行为，状态，标识
1.2.4 如何抽象一个类
http://www.runoob.com/php/php-oop.html
类的声明：成员属性+成员方法
PHP中类的简单格式：
![image.png](https://upload-images.jianshu.io/upload_images/7728915-1aa3451a0e462ca6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

当定义好一个类之后，我们通过new来生成一个对象
\$对象名称 = new 类名称（）；
$对象名称 = new 类名称（[参数列表]）；
代码示例：

        class Site{
        // 成员变量
        var $url;
        var $title;

        // 成员函数
        function setUrl($par){
            $this->url = $par;
        }

        function getUrl(){
            echo $this->url . PHP_EOL;
        }

        function setTitle($par){
            $this->title = $par;
        }
    
        function getTitle(){
            echo $this->title . PHP_EOL;
        }
    }

    $taobao = new Site();

    $taobao->setTitle('淘宝');

    $taobao->setUrl('www.taobao.com');

    $taobao->getTitle();
    echo '<br/>';
    $taobao->getUrl();
    echo '<br/>';


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
到目前为止，我们应该明白数据库最最基础的增删改查操作。

2.3 PHP操作MySQL
  * PHP连接MySQL
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

  * PHP对数据库进行插入操作（去菜鸟教程里面粘贴再修改就可以了，下面对一些关键函数进行解释）
http://www.runoob.com/php/php-mysql-insert.html


      <?php

        $servername = "localhost";
        $username = "root";
        $password = "";
        //打开一个到 MySQL 服务器的新的连接
        $conn = mysqli_connect($servername, $username, $password);
        if(! $conn )
        {
          die('连接失败: ' . mysqli_error($conn));
        }
        echo '连接成功<br />';
        // 设置编码，防止中文乱码
        mysqli_query($conn , "set names utf8");

        $newsid = '1';
        $newstitle = '新闻标题';
        $newsimg = '新闻图片';
        $newscontent = '新闻内容';
        $addtime = '2018-02-02';
        //----------------插入-----------------------
        $sql = "INSERT INTO news ".
        "(newsid,newstitle,newsimg,newscontent,addtime) ".
        "VALUES ".
        "('$newsid','$newstitle','$newsimg','$newscontent','$addtime')";

        //选择用于数据库查询的数据库，我们这里选择上面创建的phplesson库
        mysqli_select_db( $conn, 'phplesson' );
       // 执行针对数据库的查询，增删查改
        $retval = mysqli_query( $conn, $sql );
        if(! $retval )
        {
          die('无法插入数据: ' . mysqli_error($conn));
        }
        echo "数据插入成功\n";
        mysqli_close($conn);
        ?>

   * PHP连接MySQL实战
      1. 新建一个news.html

                //只贴关键代码，name会让后台更好处理一些，id是为了针对以后可能出现的操作,
               //数据上传到mysql.php进行处理
                  <form action="mysql.php">
                  <p>
                     <label for="newsid">新闻id</label>
                    <input type="text" id="newsid"name="newsid"/>
                  </p>
                  <p>
                    <label for="newstitle">新闻标题</label>
                    <input type="text" id="newstitle"name="newstitle"/>
                  </p>
                  <p>
                    <label for="newsimg">新闻图片</label>
                    <input type="text"id="newsimg"name="newsimg">
                  </p>
                  <p>
                    <label for="newscontent">新闻内容</label>
                    <textarea name="newscontent" id="newscontent" cols="30" rows="10"></textarea>
                  </p>
                  <p>
                    <label for="addtime">提交时间</label>
                    <input type="date" id="addtime" name="addtime"/>
                  </p>
                  <p>
                    <input type="submit" value="提交"/>
                    <input type="reset" />
                  </p>
              </form>
   2.新建一个mysql.php
    其实大部分和上面的mysql.php是一样的，只是将一些相对应的参数赋值成接收到的参数。

        $newsid = $_REQUEST['newsid'];
        $newstitle = $_REQUEST['newstitle'];
        $newsimg = $_REQUEST['newsimg'];
        $newscontent = $_REQUEST['newscontent'];
        $addtime = $_REQUEST['addtime'];
然后就可以见证奇迹了~~~
![image.png](https://upload-images.jianshu.io/upload_images/7728915-f725d8331c2e2681.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/7728915-cf172917ed31d316.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2.4 一些错误提示的记录
刚开始写成这样就报错了。
![image.png](https://upload-images.jianshu.io/upload_images/7728915-8b91cd05c1665809.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](https://upload-images.jianshu.io/upload_images/7728915-55582dc2e6de7997.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
去网上查了一下，发现是把\$_REQUEST[ ] 的[]写成了括号。
原因: 写成\$_REQUEST("")，php首先会认为get()是一个方法，但是前面又多了\$符号，php又认为这是一个变量，而变量名不能作为function的名字，所有会抛出"Function name must be a string"。

2.5 还有作业


