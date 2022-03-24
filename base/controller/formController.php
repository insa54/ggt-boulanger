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
                    if(isset($donnees["id"])){
                        $model->setClause("id=".$donnees["id"]);
                    }
                    $id_produit = $model->record($donnees,[],true);

                    if ($id_produit > 0) {
                        if (!empty($_FILES['image']['name'])) {
                            $upload = uploadPicture($_FILES['image'], 'produit_' . $id_produit, $route.'/base/assets/images/', 256, 'oui');

                            if ($upload[0] !== false) {
                                $donnees['image'] = $upload[1];
                            } else {
                                $donnees['image'] = "";
                                $_SESSION['notification']['erreur'] = $upload[1];
                            }

                            $donnees['id'] = $id_produit;
                            $model->setClause("id=".$donnees["id"]);
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
                    $donnees["id_user"] = $_SESSION[_USER_]->id;
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
        case "listprod":
            $model->setTable("produit");
            $model->setChamp("*");
            $model->setClause("");
            $produits = $model->getData();
            include_once("./base/views/prod_list.php");

            break;

        case "modif":
            $model->setTable("produit");
            $model->setChamp("*");
            $model->setClause("id=".$id);
            $produits = $model->getData();
            $prod = $produits[0];
            include_once("./base/views/produit_update.php");

            break;

        case "archiver":
        case "activer":
            $donnees['id'] = $id;
            $donnees['actif'] = ($action == "activer") ? 0 : 1;
            $model->setTable("produit");
            $model->setClause("id=".$id);
            $model->updateOne($donnees);
            header('location:/produit');
            break;
        
        case "delete":
            $model->setTable("produit");
            $model->setClause("id=".$id);
            $model->remove();
            header('location:/produit');
            break;
    }