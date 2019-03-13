<?php
session_start();
$_SESSION = array();
if (ini_get("session.use_cookies")) {
	$params = session_get_cookie_params();
	setcookie(session_name(), '', time() - 42000,
	$params["path"], $params["domain"],
	$params["secure"], $params["httponly"]
	);	}
	session_destroy();
	echo "Session ended";
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title>Sign Out</title>
	</head>
	<body>
		<p><a href="millionaireSignIn.php">Sign back in</a></p>
		<p><a href="millionaireSignUp/php">Sign Up</a></p>
	</body>
</html>
