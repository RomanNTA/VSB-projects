<?php



$columns = [];
$columns[] = ["text", "ISBN", "isbn"];
$columns[] = ["text", "Jméno autora", "name"];
$columns[] = ["text", "Příjmení", "surrname"];
$columns[] = ["text", "Název knihy", "title"];
$columns[] = ["text", "Popis", "descr"];
$columns[] = ["text", "URL obrázku", "url"];

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

function getForms($book)
{
    global $columns;

    $s = <<<END
    <form action="{$_SERVER['PHP_SELF']}" method="post">
END;

    $attr = get_object_vars($book);
    for ($i = 0; $i < count($columns); $i++) {
        $m = $columns[$i][2];
        $v = $attr[$m];
        $v = $v != "" ? htmlspecialchars($v) : "";

        $s .= <<<END
        <div class="mb-2">
            <label class="form-label" for="{$columns[$i][2]}">{$columns[$i][1]}</label>
            <input class="form-control" type="{$columns[$i][0]}" name="{$columns[$i][2]}" id="{$columns[$i][2]}" value="{$v}" required>
        </div>
END;
    }

    if (array_key_exists("id", $attr)) {
        $s .= "<input type='hidden' name='id' value='{$attr["id"]}'>";
    }

    $s .= <<<END
        <div class="mb-2">
            <button type="submit" class="btn btn-secondary btn-sm" name="send" >Vložit do databáze</button>
        </div>
    </form>
END;

    return $s;
}
//------------------------------------------------------------------------

// function getConditionText($inputString): string
// {

//     $reg = '/^(>=|<=|>|<|=)?/';
//     preg_match($reg, $inputString, $result);
//     return trim($result[0]) == "" ? " = " : " " . $result[0] . " ";
// }
// //------------------------------------------------------------------------

// function getConditionNumber($inputString): int
// {

//     $reg = '/(\d+)$/';
//     preg_match($reg, $inputString, $result);
//     if ($result != null) {
//         return trim($result[0]) == "" ? 0 : intval($result[0]);
//     }
//     return 0;
// }
// //------------------------------------------------------------------------
