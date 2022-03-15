<?php
    switch($action){
        case "index":
            $model->setTable("users");
            $model->setChamp("*");
            $model->setClause("");
            $users = $model->getData();
            include_once("./base/views/user_list.php");
            break;
        case "login":
            $donnees = filter_input_array(INPUT_POST);
            if ($donnees !== NULL) {
                $champsAControler = [
                    'EMPTY' => ['email', 'mdp']
                ];
                $erreur = $model->SaisieControle($donnees, $champsAControler);
                if ($erreur[0] === false) {
                    $model->setTable("users");
                    $model->setChamp("*");
                    $model->setClause("email='".$donnees['email']."'");
                    $user = $model->getData();

                    if(count($user) > 0){
                        if($user[0]->mdp === md5($donnees["mdp"])){
                            $_SESSION[_USER_] = $user[0];
                            header('location:/');
                        }else{
                            $_SESSION['notification']['erreur'] = "Mot de passe incorrect!";
                        }
                    }else{
                        $_SESSION['notification']['erreur'] = "Email invalide!";
                    }
                }else{
                    $_SESSION['notification']['erreur'] = $erreur[1];
                }

            }else{
                $_SESSION['notification']['erreur'] = "Remplir les champs!";
            }
            include_once("./base/views/login.php");
            break;

        case "ajout":
            $donnees = filter_input_array(INPUT_POST);
            if ($donnees !== NULL) {
                $champsAControler = [
                    'EMPTY' => ['nom', 'prenom', 'email', 'mdp']
                ];
                $erreur = $model->SaisieControle($donnees, $champsAControler);
                if ($erreur[0] === false) {
                    $model->setTable("users");
                    $donnees["mdp"] = md5($donnees["mdp"]);
                    $id_users = $model->record($donnees,[],true);

                    if($id_users > 0){
                        
                        header('location:/user');
                        
                    }else{
                        $_SESSION['notification']['erreur'] = "Email invalide!";
                    }
                }else{
                    $_SESSION['notification']['erreur'] = $erreur[1];
                }

            }else{
                // $_SESSION['notification']['erreur'] = "Remplir les champs!";
            }
            include_once("./base/views/ajout_user.php");
            break;
        case "logout":
            unset($_SESSION[_USER_]);
            unset($_SESSION["pagnet"]);
            header('location:/');
            break;

        case "archiver":
        case "activer":
            $donnees['id'] = $id;
            $donnees['actif'] = ($action == "activer") ? 0 : 1;
            $model->setTable("users");
            $model->setClause("id=".$id);
            $model->updateOne($donnees);
            header('location:/user');
            break;
        
        case "delete":
            $model->setTable("users");
            $model->setClause("id=".$id);
            $model->remove();
            header('location:/user');
            break;
    }