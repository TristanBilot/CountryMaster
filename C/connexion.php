<?php
  function connexion() {
    	$id=  isset($_POST['id'])?($_POST['id']):'';
    	$pw=  isset($_POST['pw'])?($_POST['pw']):'';
    	require('./M/connectBD.php');
    	$sql="SELECT * FROM `user` WHERE mail=:id AND mdp=:pw";
    	try {
    		$commande = $pdo->prepare($sql);
  			$commande->bindParam(':id', $id);
  			$commande->bindParam(':pw', $pw);

    		$bool = $commande->execute();
    		if ($bool) {
  				$resultat = $commande->fetchAll(PDO::FETCH_ASSOC);
  			}
    	}
  		catch (PDOException $e) {
  			echo utf8_encode("Echec de select : " . $e->getMessage() . "\n");
    		die();
    	}
  		if (count($resultat) == 0) {
        $msg = "Un identifiant est incorrect !";
        //echo json_encode(['reponse' => $msg]);
        require('./V/connexion.php');
  			return false;
  		}
    	else {
  		  loadUser($id, $pw);
        header("Location:" . './V/map.html');
  			return true;
  		}
    }

  function loadUser($id, $pw) {
    require('./M/connectBD.php');
  	$sql="SELECT * FROM `user` WHERE id=:id;";
  	try {
  		$commande = $pdo->prepare($sql);
  		$commande->bindParam(':id', $id);

  		$bool = $commande->execute();
  		if ($bool) {
  			$resultat = $commande->fetchAll(PDO::FETCH_ASSOC);
  		}
  	}
  	catch (PDOException $e) {
  		echo utf8_encode("Echec de select : " . $e->getMessage() . "\n");
  		die();
  	}
  	if (count($resultat) != 0) {
  		foreach ($resultat as $tuple) {
  			$_SESSION['prenom'] = $tuple['prenom'];
  			$_SESSION['nom'] = $tuple['nom'];
  			$_SESSION['mail'] = $tuple['mail'];
  		}
  		return true;
  	}
  	return false;
  }

 ?>
