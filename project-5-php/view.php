<?php
include "./map.php";
$pageName = "view";

$repo = new BooksRepository();
$books = $repo->getAllBook();

include '_header.php';

echo '<h1 class="display-5 mt-5 my-3 fs-2">Seznam knih</h1>';

foreach ($books as $book) {
    echo createDivBook($book);
}

include '_footer.php';
