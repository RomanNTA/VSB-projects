<?php
include "map.php";
$pageName = "search";

$repo = new BooksRepository();
$books = [];
$send = isset($_POST["send"]);
$resultDiv = "";

if ($send) {

    $searchIsbn = trim(inpP("searchIsbn"));
    $searchName = trim(inpP("searchName"));
    $searchSurrname = trim(inpP("searchSurrname"));
    $searchTitle = trim(inpP("searchTitle"));

    if (!($searchIsbn != "" || $searchName != "" || $searchSurrname  != "" || $searchTitle  != "")) {
        $resultDiv = <<<END
            <div class="alert alert-dismissible alert-danger my-5">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Oh oops!</strong><br>Pro vyhledávání je nutné zadat alespoň jeden parametr.
            </div>
END;
    } else {
        $books = $repo->searchBooks($searchIsbn, $searchName, $searchSurrname, $searchTitle);
    }
}
?>
<?php include '_header.php'; ?>
<h1 class="display-5 mt-5 mb-4 fs-2">Vyhledání knihy podle zadaných kriterii</h1>

<form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
    <div class="d-flex flex-wrap">
        <div class="col-12 p-3 col-md-3">
            <label class="form-label" for="isbn">Jméno:</label>
            <input type="text" class="form-control" name="searchName" id="search" placeholder="Jméno autora knihy ?"
                value="<?php echo inpP("searchName") ?>">
        </div>
        <div class="col-12 p-3 col-md-3">
            <label class="form-label" for="isbn">Příjmení:</label>
            <input type="text" class="form-control" name="searchSurrname" id="search" placeholder="Příjmení autora knihy ?"
                value="<?php echo inpP("searchSurrname") ?>">
        </div>
        <div class="col-12 p-3 col-md-3">
            <label class="form-label" for="isbn">Název knihy:</label>
            <input type="text" class="form-control" name="searchTitle" id="search" placeholder="Název knihy ?"
                value="<?php echo inpP("searchTitle") ?>">
        </div>
        <div class="col-12 p-3 col-md-3">
            <label class="form-label" for="isbn">ISBN:</label>
            <input type="text" class="form-control" name="searchIsbn" id="search" placeholder="ISBN ?"
                value="<?php echo inpP("searchIsbn") ?>">
        </div>
    </div>
    <div class="col-12 py-5 d-flex justify-content-center">
        <input class="btn btn-primary btn-lg " type="submit" name="send" id="search" value="Hledej">
    </div>
    <?php echo $resultDiv; ?>
</form>
<div class="clearfix"></div>


<?php
foreach ($books as $book) {
    echo createDivBook($book);
}

include '_footer.php';
