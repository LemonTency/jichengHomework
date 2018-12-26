<?php 
class Person{
    function __construct(){
        echo "构造函数";
        echo "<br/>";
        $this->name = "小明";
    }

    function __destruct(){
        echo "销毁".$this->name;    
        echo "<br/>";
    }
}

$obj1 = new Person();

?>