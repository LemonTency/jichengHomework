<?php
interface Person{
    const NAME = 'xiaowang';
    public function run();
    public function eat();
}
interface Study{
    public function study();
}
class Student implements Person,Study{
    public function run(){
        echo "run";
    }
    //对接口的实现
    public function eat(){
        echo "eat";
    }
    public function study(){
        echo "study";
    }  
}

$obj = new Student();
$obj->run();
$obj->eat();
$obj->study();
?>