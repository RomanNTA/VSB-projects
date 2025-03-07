<?php
include 'map.php';
$pageName = "index";

$resultDiv = "";
$repo = new BooksRepository();
$send = isset($_POST["send"]);
$book = getObjFromPost();
if ($send) {
    $repo = new BooksRepository();
    if (!$repo->createBook($book)) {
        $resultDiv = <<<END
            <div class="alert alert-dismissible alert-success my-5">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Vše v pořádku!</strong><br>Data byly uloženy.
            </div>
END;
        $book = new Book();
    } else {
        $resultDiv = <<<END
            <div class="alert alert-dismissible alert-danger my-5">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Oh oops!</strong><br>Data se nezdařilo vložit do databáze.
            </div>
END;
    }
}
?>
<?php include '_header.php'; ?>
<div class="container">
    <h1 class="display-5 mt-5 my-3">Vložení nové knihy</h1>

    <form action="/index.php" method="post">
        <div class="mb-2">
            <label class="form-label" for="isbn">ISBN</label>
            <input class="form-control" type="text" name="isbn" id="isbn" value="" required>
        </div>
        <div class="mb-2">
            <label class="form-label" for="name">Jméno autora</label>
            <input class="form-control" type="text" name="name" id="name" value="" required>
        </div>
        <div class="mb-2">
            <label class="form-label" for="surrname">Příjmení</label>
            <input class="form-control" type="text" name="surrname" id="surrname" value="" required>
        </div>
        <div class="mb-2">
            <label class="form-label" for="title">Název knihy</label>
            <input class="form-control" type="text" name="title" id="title" value="" required>
        </div>
        <div class="mb-2">
            <label class="form-label" for="descr">Popis</label>
            <textarea class="form-control" rows="3" type="textarea" name="descr" id="descr" value="" required></textarea>
        </div>
        <div class="mb-2">
            <label class="form-label" for="url">URL obrázku</label>
            <input class="form-control" type="text" name="url" id="url" value="" required>
        </div><input type='hidden' name='id' value='0'>
        <div class="mb-2">
            <button type="submit" class="btn btn-primary " name="send">Vložit do databáze</button>
        </div>
    </form>

    <?php echo $resultDiv; ?>
</div>
<?php include '_footer.php'; ?>