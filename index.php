<?php
	if (!isset($_SESSION)) {
    session_start();
  }
  if (isset($_GET['controle']) && isset($_GET['action'])) {
    $controle = $_GET['controle'];
    $action = $_GET['action'];
  }
	else {
		$controle = "page_controller";
    $action = "connexion";
	}

  if (isset($_GET['parametre'])) {
      $parametre = $_GET['parametre'];
  }
  else {
      $parametre = "";
  }
  require ("./C/" . $controle . ".php");

  $action($parametre);

?>
<head >
    <meta charset="UTF-8">
</head>

<html>
<link rel = "stylesheet" href="https://bootswatch.com/4/journal/bootstrap.min.css"/>
<link rel = "stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</html>
