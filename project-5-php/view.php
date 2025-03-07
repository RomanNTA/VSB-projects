<?php
header("Expires: Mon, 01 Jul 2024 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-cache, must-revalidate");  // HTTP/1.1
header("Pragma: no-cache");                          // HTTP/1.0

include "./map.php";
$pageName = "view";

$repo = new BooksRepository();
$books = $repo->getAllBook();

?>
<?php include '_header.php'; ?>
<div class="container">
    <h1 class="display-5">Seznam knih</h1>
    <table class="table table-striped">
        <tr>
            <th>ISBN</th>
            <th>Jméno autora</th>
            <th>Příjmení autora</th>
            <th>Název knihy</th>
            <th>Popis knihy</th>
            <th>URL obrázku</th>
        </tr>
        <?php foreach ($books as $book) : ?>
            <tr>
                <td><?php echo htmlspecialchars($book->isbn); ?></td>
                <td><?php echo htmlspecialchars($book->name); ?></td>
                <td><?php echo htmlspecialchars($book->surrname); ?></td>
                <td><?php echo htmlspecialchars($book->title); ?></td>
                <td><?php echo htmlspecialchars($book->descr); ?></td>
                <td><?php echo htmlspecialchars($book->url); ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
</div>

<?php include '_footer.php'; ?>