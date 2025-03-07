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
