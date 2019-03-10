<!doctype html>
<html><head>
  <meta charset="utf-8">
  <title>Connexion</title>


  <link rel="stylesheet" href="../Assets/css/connexion.css">
</head>

<body>

<br><br>

   <!-- fin du menu nav -->
<?php if (isset($_SESSION['annotation'])) { echo "<p class='text-success' style='margin-left:20px;'>" . $_SESSION['annotation'] . "</p>";} ?>
<center>
  <div id ="main" class="form-group login" style="width:400px;margin-top:200px">
  	<h1>Connexion</h1>
      <form id = "connexionForm" action="index.php?controle=connexion&action=connexion" method="post">
      	<input id = "login" name="id" value="" class="form-control-sm" type="text" name="u" placeholder="Email" required="required" />
          <input id = "password" type= "password" name="pw" value="" class="form-control-sm" type="password" name="p" placeholder="Mot de passe" required="required" />
          <button type="submit" id = "connexionBtn" value= "Connexion" class="btn btn-primary btn-block btn-large">Accéder à ma carte.</button>
      </form>
  </div>
</center>




<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="./Assets/js/authentification.js"></script>
<script>
$("#login-button").click(function(event){
  event.preventDefault();

$('form').fadeOut(500);
$('.wrapper').addClass('form-success');
});
</script>
</body></html>
