<?php
class myClass{
    public $public = "public";
    private $private = "private";
    protected $protected = "protected";

    public function getThing(){
        echo $this->public;
        echo "<br/>";
        echo $this->private;
        echo "<br/>";
        echo $this->protected;
        echo "<br/>";
    }
}

// $obj = new myClass();
// $obj->getThing();
// $obj->public;
// $obj->protected; //产生错误
// $obj->private; //产生错误



class myCLass2 extends myClass{
    protected $protected = "protect2";

    function getThing2(){
        echo $this->public;
        echo "<br/>";
        echo $this->private;
        echo "<br/>";
        echo $this->protected;
        echo "<br/>";
    }
}

$obj2 = new myClass2();
// $obj2->getThing2(); //public = public;private 错误（undefined property);protected= protect2;
// $obj2->protected; //产生错误
// $obj2->private; //private未被定义

?>