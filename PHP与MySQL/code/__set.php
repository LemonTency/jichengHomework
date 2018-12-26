<?php
class Person{
    private $name;
    private $sex;
    private $age;

    //__set方法用来设置私有属性
    function __set($key,$value){
        echo "在直接设置私有属性值的时候，自动调用了这个__set()方法为私有属性赋值<br/>";
        $this->$key = $value;
    }

    function __get($key){
        echo "在直接获取私有属性值的时候，自动调用了这个__get()方法<br/>";
        return isset($this->$key)?$this->$key : null;
    }
}

    $p1 = new Person();
    $p1->name = "张三";
    echo "我的名字叫".$p1->name;
?>