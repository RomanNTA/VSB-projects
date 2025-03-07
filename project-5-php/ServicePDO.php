<?php

class ServicePDO
{
    private static $instance = null;

    private $pdo;
    private $DbConst = [];

    public $isError = false;
    public $resultMessage = "";

    private function __construct()
    {
        $this->DbConst = require "ServerDbConst.php";
        try {
            $connection = sprintf('mysql:host=%s; dbname=%s', $this->DbConst["host"], $this->DbConst["dbname"]);
            $this->pdo = new PDO(
                $connection,
                $this->DbConst['username'],
                $this->DbConst['password'],
                array(
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8 COLLATE utf8_general_ci",
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION
                )
            );
            $this->isError = false;
        } catch (PDOException $e) {
            $this->isError = true;
            $this->resultMessage = "Připojení k databázi selhalo: " . $e->getMessage();
        }
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new ServicePDO();
        }
        return self::$instance;
    }

    public function getPDO(): PDO
    {
        //echo $this->resultMessage;
        return $this->pdo;
    }

    // Zamezení klonování
    private function __clone() {}
    // Zamezení deserializace
    public function __wakeup() {}
}
