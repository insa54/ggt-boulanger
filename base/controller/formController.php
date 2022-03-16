<?php
    // session_start();
    // include '../app/include.php';
    // $model = new Model($dao, '');
    // $admin = [""];
    // if(in_array($action, $admin)){
    //     header('location:connexion.html');
    // }
    switch($action){
        case "ajoutProduit":
            $donnees = filter_input_array(INPUT_POST);
            if ($donnees !== NULL) {
                $champsAControler = [
                    'EMPTY' => ['libelle', 'prix']
                ];
                $erreur = $model->SaisieControle($donnees, $champsAControler);
                if ($erreur[0] === false) {

                    $model->setTable("produit");
                    $id_produit = $model->record($donnees,[],true);

                    if ($id_produit > 0) {
                        if (!empty($_FILES['image']['name'])) {
                            $upload = uploadPicture($_FILES['image'], 'produit_' . $id_produit, $route.'/base/assets/images/', 256, 'oui');
                            move_uploaded_file($_FILES["image"]["tmp_name"], $route.'/base/assets/images/');
                            $donnees['image'] = $_FILES["image"]["tmp_name"];
                            // if ($upload[0] !== false) {
                            //     $donnees['image'] = $_FILES["pictures"]["tmp_name"]
                            // } else {
                            //     $donnees['image'] = "";
                            //     $_SESSION['notification']['erreur'] = $upload[1];
                            // }

                            $donnees['id'] = $id_produit;
                            $model->updateOne($donnees);
                        }
                        $_SESSION['notification']['success'] = "Produit ajoutée!!";
                    }else{
                        $_SESSION['notification']['erreur'] = "L'ajout du produit a échouer veuillez reesayer!";
                    }
                }else{
                    $_SESSION['notification']['erreur'] = $erreur[1];
                }
                header('Location: ' . $_SERVER['HTTP_REFERER']);
            }else{

            }
            break;
        case "venteProduit":
            $donnees = filter_input_array(INPUT_POST);
            if ($donnees !== NULL) {
                if(intval($donnees['qte']) === 0){
                    $_SESSION['notification']['erreur'] = "Ajouter la quantité vendu";
                    header('Location: ' . $_SERVER['HTTP_REFERER']);
                }else{
                    $donnees['total'] = $donnees['prix'] * $donnees['qte'];
                    $_SESSION["pagnet"][] = $donnees;
                    // unset($donnees['prix']);
                    // $model->setTable("vente");
                    // $id_vente = $model->record($donnees,[],true);
                    $_SESSION['notification']['success'] = "Produit ajouté dans le panier";
                    header('Location: ' . $_SERVER['HTTP_REFERER']);
                }
            }else{

            }
            break;

        case "valider":
            if (isset($_SESSION["pagnet"]) && count($_SESSION["pagnet"] > 0)) {
                foreach($_SESSION["pagnet"] as $donnees){
                    unset($donnees['prix']);
                    unset($donnees['libelle']);
                    $model->setTable("vente");
                    $id_vente = $model->record($donnees,[],true);
                    $_SESSION['notification']['success'] = "Vente ajoutée";
                }
                unset($_SESSION["pagnet"]);
                header('Location: ' . $_SERVER['HTTP_REFERER']);
            }else{

            }
            break;
        
        case "finaliser":
            $allprod = 0;
            if(isset($_SESSION["pagnet"])){
                foreach($_SESSION["pagnet"] as $pagnet){
                    $allprod += $pagnet['total'];
                }
            }
            include_once("./base/views/_inc_vente_final.php");
            break;

        case "delFromPagnet":
            unset($_SESSION["pagnet"][$index]);
            $allprod = 0;
            foreach($_SESSION["pagnet"] as $pagnet){
                $allprod += $pagnet['total'];
            }
            include_once("./base/views/_inc_vente_final.php");
            break;
        
    }