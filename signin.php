<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title>Sign In</title>
	</head>
	<body>
		<form action="game.php" method="post">
		<select>
		<?php
		require '../config.php';
		try{
			$dbh = new PDO(DB_DSN, DB_USER, DB_PASSWORD);
			$sth = $dbh->prepare("SELECT * FROM player");
			$sth->execute();
			$names = $sth->fetchAll();

		} catch(PDOException $e){
			echo "<p>Error connecting to database!</p>";
		}

		for($i = 1; $i<count($names); $i++){
			echo "<option value='{$i}'>{$names[$i]['name']}</option>";
		}
		?>
	</select>
</form>
	</body>
</html>
