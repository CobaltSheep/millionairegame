<?php
	require_once "config.php";
	try {
		$dbh = new PDO(DB_DSN, DB_USER, DB_PASSWORD);
		$sth = file_get_contents("millionaire.sql");
		$dbh->exec($sth);
	}
	catch (PDOException $e) {
        echo "<p>Error: {$e->getMessage()}</p>";
    }
	echo "Successfully installed table"
 ?>
