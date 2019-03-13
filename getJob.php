<?php
session_start();
require_once "config.php";
try {
	$dbh = new PDO(DB_DSN, DB_USER, DB_PASSWORD);
  $sth = $dbh->prepare("UPDATE players SET players.job = :job WHERE id = :id");
  $sth->bindValue(':job', $_POST['job']);
	$sth->bindValue(':id', $_SESSION['user']);
  $sth->execute();
}
catch (PDOException $e) {
    echo "<p>Error connecting to database!</p>";
}
?>
