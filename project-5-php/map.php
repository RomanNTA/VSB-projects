<?php
header("Expires: Mon, 01 Jul 2024 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-cache, must-revalidate");  // HTTP/1.1
header("Pragma: no-cache");                          // HTTP/1.0

require_once "ServicePDO.php";
require_once "Book.php";
require_once "BooksRepository.php";

$uri = str_contains($_SERVER['REQUEST_URI'], "project5") ? "/project5/" : "/";

//------------------------------------------------------------------------
function inpP($name, $default = ""): string
{
    return isset($_POST[$name]) ? $_POST[$name] : $default;
}
//------------------------------------------------------------------------
function getObjFromPost()
{
    return new Book(
        inpP("isbn"),
        inpP("name"),
        inpP("surrname"),
        inpP("title"),
        inpP("descr"),
        inpP("url"),
        inpP("id", 0)
    );
}
//------------------------------------------------------------------------
function createDivBook(Book $book)
{
    $name = htmlspecialchars($book->name);
    $surrname = htmlspecialchars($book->surrname);
    $title = htmlspecialchars($book->title);
    $isbn = htmlspecialchars($book->isbn);
    $descr = htmlspecialchars($book->descr);

    return <<<END
    <div class="row pb-2">
        <div class="d-flex pb-3 m-0 n-border">

            <div class="col-12 col-md-2 px-3">
                <img src="{$book->url}" class="object-fit-contain img-fluid"  alt="obrázek knihy '{$title}'">
            </div>

            <div class="col-12 col-md-10">
                <div class="col-12">
                    <strong>Jméno a příjmení autora: </strong>
                    {$name}&nbsp{$surrname}
                </div>
                <div class="col-12">
                    <strong>Názv knihy: </strong>
                    <span class="font-weight-bold">{$title}</span>
                </div>
                <div class="col-12">
                    <small>ISBN : {$isbn}</small>
                </div>
                <div class="col-12">
                    <strong>Popis knihy: </strong>
                    <p>{$descr}</p>
                </div>
            </div>

        </div>
    </div>
END;
}
