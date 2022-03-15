<?php
    switch($action){
        case "accueil":
            $model->setTable("produit");
            $model->setChamp("*");
            $model->setClause("");
            $produits = $model->getData();
            include_once("./base/views/accueil.php");
            break;
        case "bilan":
            $mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
            $model->setTable("vente");
            $model->setChamp("*");
            $model->setClause("");
            $produit = $model->getData();
            foreach($produit as $data){
                dump($data->date_vente->month);exit();
                $txt = $this->mois[$data->date_vente->month-1].'-'.$data->date_vente->year;
                if(!in_array($txt, $allmois)){
                    $allmois[] = $txt;
                }
            }
            array_reverse($allmois);
            break;
    }