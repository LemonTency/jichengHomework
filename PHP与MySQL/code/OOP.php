<?php
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
$google = new Site();

$taobao->setTitle('淘宝');
$google->setTitle('谷歌');

$taobao->setUrl('www.taobao.com');
$google->setUrl('www.google.com');

$taobao->getTitle();
echo '<br/>';
$google->getTitle();
echo '<br/>';

$taobao->getUrl();
echo '<br/>';
$google->getUrl();
echo '<br/>';
?>