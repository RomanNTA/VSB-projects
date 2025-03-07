<?php
header("Expires: Mon, 01 Jul 2024 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-cache, must-revalidate");  // HTTP/1.1
header("Pragma: no-cache");                          // HTTP/1.0

$pageName = "index";

include 'map.php';

$paramstr = "";
$repo = new BooksRepository();
$send = isset($_POST["send"]);
$book = getObjFromPost();
if ($send) {
    $repo = new BooksRepository();
    if ($repo->createBook($book)) {
        $paramstr = "Vložení ok";
        $book = new Book();
    } else {
        $paramstr = "Vložení se nezdařilo";
    }
}
?>
<?php include '_header.php'; ?>

<div class="container">
    <h1 class="display-5">Vložení nové hnihy</h1>
    <?php echo getForms($book); ?>
    <p><?php echo $paramstr; ?></p>
</div>

<?php include '_footer.php'; ?>