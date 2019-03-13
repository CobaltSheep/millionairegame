<?php
session_start();
require_once "config.php";
try {
	$dbh = new PDO(DB_DSN, DB_USER, DB_PASSWORD);
  $sth = $dbh->prepare("UPDATE players SET players.house = :house WHERE id = :id");
  $sth->bindValue(':house', $_POST['house']);
	$sth->bindValue(':id', $_SESSION['user']);
  $sth->execute();
}
catch (PDOException $e) {
    echo "<p>Error connecting to database!</p>";
}
?>
