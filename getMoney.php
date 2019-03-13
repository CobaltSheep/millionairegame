<?php
session_start();
require_once "config.php";
try {
	$dbh = new PDO(DB_DSN, DB_USER, DB_PASSWORD);
  $sth = $dbh->prepare("UPDATE players SET players.money = :amount WHERE id = :id");
  $sth->bindValue(':amount', $_POST['amount']);
	$sth->bindValue(':id', $_SESSION['user']);
  $sth->execute();
}
catch (PDOException $e) {
    echo "<p>Error connecting to database!</p>";
}
?>
