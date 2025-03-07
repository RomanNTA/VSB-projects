<?php
include "./map.php";
$pageName = "view";

$repo = new BooksRepository();
$books = $repo->getAllBook();

?>
<?php include '_header.php'; ?>
<div class="container">
    <h1 class="display-5 mt-5 my-3">Seznam knih</h1>

    <table class="table table-striped">
        <tr>
            <th>&nbsp;</th>
            <th>Jméno autora</th>
            <th>Příjmení autora</th>
            <th>Název knihy</th>
            <th>ISBN</th>
        </tr>
        <?php foreach ($books as $book) : ?>
            <tr>
                <td rowspan="2">
                    <img src="<?php echo htmlspecialchars($book->url); ?>" class="object-fit-contain" style="width:150px;" alt="obrázek knihy '<?php echo htmlspecialchars($book->title); ?>'">
                </td>
                <td><?php echo htmlspecialchars($book->name); ?></td>
                <td><?php echo htmlspecialchars($book->surrname); ?></td>
                <td><?php echo htmlspecialchars($book->title); ?></td>
                <td><?php echo htmlspecialchars($book->isbn); ?></td>
            </tr>
            <tr>
                <td colspan=4><?php echo htmlspecialchars($book->descr); ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
</div>

<?php include '_footer.php'; ?>