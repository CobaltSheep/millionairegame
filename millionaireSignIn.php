<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title>Sign In</title>
	</head>
	<body>
		<?php
		require_once "config.php";
		if(isset($_POST["user"])) {
			$user = htmlspecialchars($_POST["user"]);
			$pass = password_hash($_POST["pass"], PASSWORD_DEFAULT);
			//var_dump($_POST);
			 try {
				$dbh = new PDO(DB_DSN, DB_USER, DB_PASSWORD);
				$sth = $dbh->prepare("INSERT INTO `players`
									  (`user`, `pass`, `money`, `house`, `job`)
									  VALUES (:user, :pass, 0, 'pond', 'begger')");
				$sth->bindValue(':user', $user);
				$sth->bindValue(':pass', $pass);
				$sth->execute();
			 }
			 catch (PDOException $e) {
				   echo "<p>Error connecting to database!</p>";
			 }
		 }
		 try {
			 $dbh = new PDO(DB_DSN, DB_USER, DB_PASSWORD);
			 $sth = $dbh->prepare("SELECT id,user FROM players");
			 $sth->execute();
			 $players = $sth->fetchAll();
			 //var_dump($players);
		 }
		 catch (PDOException $e) {
			   echo "<p>Error connecting to database!</p>";
		 }
		 ?>
		<form action="millionaire.php" method="post">
		 <select name="user">
			<?php
			 for($i = 0; $i < count($players); $i++) {
				 echo "<option value = '{$players[$i]['id']}'>{$players[$i]['user']}</option>";
			 }
			 ?>
		 </select>
		 <p>Password: <input type="password" name="pass"></p>
		 <input type="submit" value="Sign In">
		</form>
		<p><b>USE WASD TO MOVE</b></p>
		<p><b>WARNING: IF YOU CHEAT, WE WILL DROP YOUR ACCOUNT</b></p>
		<p>Instructions: Used WASD to move around the town. You start out living in a pond as a beggar. Work to gain money and make sure you have enough food and
			energy to do so. Sleep using your home, and eat at the store. Use the bank to make investments or take loans. Use the casino to gamble or play blackjack.
			Use the money to buy stocks, homes, or jobs. The beggar works at the bridge, the gardener at the garden, the chef at the diner, and the doctor at the hospital.
			Avoiding cheating will make it more fun! Signout by clicking the link on the bottom left. Your progress will be saved!</p>

	</body>
</html>
