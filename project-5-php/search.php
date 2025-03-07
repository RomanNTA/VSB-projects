<?php
header("Expires: Mon, 01 Jul 2024 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-cache, must-revalidate");  // HTTP/1.1
header("Pragma: no-cache");                          // HTTP/1.0


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
    // echo $searchIsbn . " == " . $searchName  . " == " .  $searchSurrname   . " == " .  $searchTitle  . "<br><br>";

    if (!($searchIsbn != "" || $searchName != "" || $searchSurrname  != "" || $searchTitle  != "")) {
        $resultDiv = <<<END

            <div class="alert alert-dismissible alert-danger">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Oh oops!</strong>Alespoň jeden parametr musí být zadaný
            </div>

END;
    } else {
        $books = $repo->searchBooks($searchIsbn, $searchName, $searchSurrname, $searchTitle);
    }
}
?>
<?php include '_header.php'; ?>
<div class="container">

    <h1 class="display-5">Seznam aut</h1>

    <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post" onsubmit="return otestujInputy()">
        <table class="table ">
            <tr>
                <th class="bg-secondary"><input type="text" name="searchIsbn" id="search" value="<?php echo inpP("searchIsbn") ?>"></th>
                <th class="bg-secondary"><input type="text" name="searchName" id="search" value="<?php echo inpP("searchName") ?>"></th>
                <th class="bg-secondary"><input type="text" name="searchSurrname" id="search" value="<?php echo inpP("searchSurrname") ?>"></th>
                <th class="bg-secondary"><input type="text" name="searchTitle" id="search" value="<?php echo inpP("searchTitle") ?>"></th>
                <th colspan="2" class="bg-secondary"><input type="submit" name="send" id="search" value="Hledej"></th>
            </tr>
            <tr>
            <tr>
                <th>ISBN</th>
                <th>Jméno autora</th>
                <th>Příjmení autora</th>
                <th colspan=2>Název knihy</th>
            </tr>
            </tr>
            <?php if ($books == []) {
                echo "<tr><td>Sezanm je prázdný</td></tr>";
            } else {
                foreach ($books as $book) : ?>
                    <tr>
                        <td><?php echo htmlspecialchars($book->isbn); ?></td>
                        <td><?php echo htmlspecialchars($book->name); ?></td>
                        <td><?php echo htmlspecialchars($book->surrname); ?></td>
                        <td colspan=2><?php echo htmlspecialchars($book->title); ?></td>
                    </tr>
                    <tr>
                        <td>Popis knihy</td>
                        <td colspan=4><?php echo htmlspecialchars($book->descr); ?></td>
                    </tr>
                    <tr>
                        <td>URL obrázku</td>
                        <td colspan=4><?php echo htmlspecialchars($book->url); ?></td>
                    </tr>
                    <tr>
                        <td colspan=6 class="bg-secondary">

                        </td>
                    </tr>
            <?php endforeach;
            } ?>
        </table>
    </form>
    <?php echo $resultDiv ?>



</div>

<?php include '_footer.php'; ?>