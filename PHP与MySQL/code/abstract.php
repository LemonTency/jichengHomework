<?php
abstract class Person{
    //抽象方法，没有方法体
    public abstract function eat();
}
class Man extends Person{
    public function eat(){
        echo "Man eat";
    }
}

$man = new Man();
$man->eat();
?>