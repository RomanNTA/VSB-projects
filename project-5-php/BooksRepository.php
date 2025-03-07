<?php

class BooksRepository
{
    private $pdo;


    public function __construct()
    {
        $this->pdo = ServicePDO::getInstance()->getPDO();
    }

    public function getAllBook()
    {
        $stmt = $this->pdo->query('SELECT * FROM books');
        $books  = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $books[] = new Book($row['isbn'], $row['name'], $row['surrname'], $row['title'], $row['descr'], $row['url'], $row['id']);
        }
        return $books;
    }

    public function createBook(Book $book)
    {
        $stmt = $this->pdo->prepare("INSERT INTO books (isbn, name, surrname, title, descr, url) VALUES (?,?,?,?,?,?)");
        return $stmt->execute([$book->isbn, $book->name, $book->surrname, $book->title, $book->descr, $book->url]);
    }
    // ------------------------------------------------------------------------------------------------------------------------
    public function searchBooks(
        $searchIsbn = "",
        $searchName = "",
        $searchSurrname = "",
        $searchTitle = ""
    )
    // ------------------------------------------------------------------------------------------------------------------------
    {
        $sqlAdd = "";
        $sqlArr = [];

        // -------------------------------------------------------------------------------------
        $addTxt = function ($value, $name) use (&$sqlAdd, &$sqlArr) {
            if ($value != "") {
                $value = "%" . $value . "%";
                $sqlAdd .= $sqlAdd != "" ? " AND " : "";
                $sqlAdd .= " UPPER({$name}) like UPPER(?) ";
                $sqlArr = $sqlArr == [] ? [$value] : array_merge($sqlArr, [$value]);
            }
        };

        // -------------------------------------------------------------------------------------
        // $addNumber = function ($value, $name) use (&$sqlAdd, &$sqlArr) {
        //     if ($value != "") {

        //         $reg = '/^(>=|<=|>|<|=)?/';
        //         preg_match($reg, $value, $result);
        //         $cond = trim($result[0]) == "" ? " = " : " " . $result[0] . " ";

        //         $number = 0;
        //         $reg = '/(\d+)$/';
        //         preg_match($reg, $value, $result);
        //         if ($result != null) {
        //             $number = trim($result[0]) == "" ? 0 : intval($result[0]);
        //         }
        //         $sqlAdd .= $sqlAdd != "" ? " AND " : "";
        //         $sqlAdd .= " {$name} {$cond} ? ";
        //         $sqlArr =  array_merge($sqlArr, [$number]);
        //     }
        // };
        // -------------------------------------------------------------------------------------
        $addTxt($searchIsbn, "isbn");
        $addTxt($searchName, "name");
        $addTxt($searchSurrname, "surrname");
        $addTxt($searchTitle, "title");

        $Sql = "SELECT * FROM books ";
        $Sql .= $sqlAdd == "" ? "" : " WHERE " .  $sqlAdd;

        $stmt = $this->pdo->prepare($Sql);
        //$stmt->debugDumpParams();
        //echo "<br><br>";

        $stmt->execute($sqlArr);
        $books  = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $books[] = new Book($row['isbn'], $row['name'], $row['surrname'], $row['title'], $row['descr'], $row['url'], $row['id']);
        }
        return $books;
    }
    // ------------------------------------------------------------------------------------------------------------------------


}
