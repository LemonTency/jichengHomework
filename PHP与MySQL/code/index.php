<!DOCTYPE html>
<?php
session_start();
// 存储 session 数据
$_SESSION['views']=1;
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>我的第一个PHP</title>
</head>
<body>
    <?php 
    //------------基本用法
    // echo "我是一个小青蛙";
    // $b = "我是外面的小青蛙";
    // function test(){
    //     $a = 1;
    //     echo $a;
    //     global $b;
    //     echo $b;
    // }
    // test()
    //-----------------数组
    // $arrayTest = array('0'=>"apple",'1'=>'pear');
    // echo json_encode($arrayTest);
    //数组,json_encode将其转换为json格式。
    // echo $arrayTest[0]  //就跟我们平常取数组的数一样。
    //-----------------session
    //------------------require_once
    // include_once("a.php");
    // $a = "我是外面的";
    // function test(){
    //     global $a;
    //     echo $GLOBALS['b'];
    //     echo "<br>";
    //     echo $a;
    // }
    // test()
    //----------------$GLOBALS
    // $a = 100;
    // $b = 200;
    // function test(){
    //     $GLOBALS['c'] = $GLOBALS['a'] + $GLOBALS['b'];
    // }
    // test();
    // echo $c;
    //------------------sessionstart
    echo "浏览量：". $_SESSION['views'];
    ?>
    
</body>
</html>