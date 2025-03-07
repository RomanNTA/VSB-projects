<?php




class Book
{
    //properties
    public $id;
    public $isbn;
    public $name;
    public $surrname;
    public $title;
    public $descr;
    public $url;

    //konstruktor
    public function __construct($isbn = "", $name = "", $surrname = "", $title = "", $descr = "", $url = "", $id = -1)
    {
        $this->id = $id;
        $this->isbn = $isbn;
        $this->name = $name;
        $this->surrname = $surrname;
        $this->title = $title;
        $this->descr = $descr;
        $this->url = $url;
    }
}
