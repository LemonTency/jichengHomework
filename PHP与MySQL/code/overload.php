<?php
class Person{
    public $name;
    protected $money;
    private $age;

    public function __constructor($name,$money,$age){
        $this->name = $name;
        $this->money = $money;
        $this->age = $age;
    }

    public function cardInfo(){
        echo 'name->'.$this->name.'money->'.$this->money.'age->'.$this.age;
    }
}

class Yellow extends Person{
    function __constructor($name,$money,$age){
        parent::__constructor($name,$money,$age);
    }
    //上面是php 重写
    public function cardInfo($oo){
        parent::cardInfo();
        echo $oo;
    }
    //上面是php重载
}

$obj = new Yellow("xiao",12,100);
$obj->cardInfo(9);

?>