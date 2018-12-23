<?php

$servername = "localhost";
$username = "root";
$password = "";
$conn = mysqli_connect($servername, $username, $password);
if(! $conn )
{
  die('连接失败: ' . mysqli_error($conn));
}
echo '连接成功<br />';
// 设置编码，防止中文乱码
mysqli_query($conn , "set names utf8");

// $newsid = '1';
// $newstitle = '新闻标题';
// $newsimg = '新闻图片';
// $newscontent = '新闻内容';
// $addtime = '2018-02-02';


$newsid = $_REQUEST['newsid'];
$newstitle = $_REQUEST['newstitle'];
$newsimg = $_REQUEST['newsimg'];
$newscontent = $_REQUEST['newscontent'];
$addtime = $_REQUEST['addtime'];
 
//----------------插入-----------------------
$sql = "INSERT INTO news ".
        "(newsid,newstitle,newsimg,newscontent,addtime) ".
        "VALUES ".
        "('$newsid','$newstitle','$newsimg','$newscontent','$addtime')";
//插入

  
mysqli_select_db( $conn, 'phplesson' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
  die('无法插入数据: ' . mysqli_error($conn));
}
echo "数据插入成功\n";
mysqli_close($conn);
?>
