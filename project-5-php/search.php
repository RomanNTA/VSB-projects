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
<div class="container">
    <h1 class="display-5 mt-5 my-3">Vyhledání knihy podle zadaných kriterii</h1>
    <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post" onsubmit="return otestujInputy()">
        <table class="table ">
            <tr>
                <th>&nbsp;</th>
                <th>Jméno</th>
                <th>Příjmení</th>
                <th>Název knihy</th>
                <th>ISBN</th>
            </tr>
            <tr>
                <th class="bg-warning">&nbsp;</th>
                <th class="bg-warning"><input type="text" name="searchName" id="search" value="<?php echo inpP("searchName") ?>"></th>
                <th class="bg-warning"><input type="text" name="searchSurrname" id="search" value="<?php echo inpP("searchSurrname") ?>"></th>
                <th class="bg-warning"><input type="text" name="searchTitle" id="search" value="<?php echo inpP("searchTitle") ?>"></th>
                <th class="bg-warning"><input type="text" name="searchIsbn" id="search" value="<?php echo inpP("searchIsbn") ?>"></th>
                <th colspan="2" class="bg-warning"><input type="submit" name="send" id="search" value="Hledej"></th>
            </tr>
            <?php if ($books == []) {
                echo "<tr><td>Seznam je prázdný</td></tr>";
            } else {
            ?>
                <tr>
                    <th>&nbsp;</th>
                    <th>Jméno autora</th>
                    <th>Příjmení autora</th>
                    <th colspan=2>Název knihy</th>
                    <th>ISBN</th>
                </tr>
                <?php
                foreach ($books as $book) : ?>
                    <tr>
                        <td rowspan="2">
                            <img src="<?php echo htmlspecialchars($book->url); ?>" class="object-fit-contain" style="width:150px;" alt="">
                        </td>
                        <td><?php echo htmlspecialchars($book->name); ?></td>
                        <td><?php echo htmlspecialchars($book->surrname); ?></td>
                        <td colspan=2><?php echo htmlspecialchars($book->title); ?></td>
                        <td><?php echo htmlspecialchars($book->isbn); ?></td>
                    </tr>
                    <tr>
                        <td>Popis knihy</td>
                        <td colspan=4><?php echo htmlspecialchars($book->descr); ?></td>
                    </tr>
                    <tr>
                        <td colspan=6 class="bg-primary">
                        </td>
                    </tr>
            <?php endforeach;
            } ?>
        </table>
    </form>
    <?php echo $resultDiv ?>
</div>

<?php include '_footer.php'; ?>