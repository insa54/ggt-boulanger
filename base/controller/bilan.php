<?php
    $mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
    switch($action){
        case "bilan":
            $allmois = [];
            $model->setTable("vente");
            $model->setChamp("*");
            $model->setClause("");
            $produit = $model->getData();
            foreach($produit as $data){
                $txt = $mois[date("n",strtotime($data->date_vente))-1].'-'.date("Y",strtotime($data->date_vente));
                if(!in_array($txt, $allmois)){
                    $allmois[] = $txt;
                }
            }
            array_reverse($allmois);
            include_once("./base/views/bilan.php");
            break;
        case "detail": 
            $dateTable = explode('-', $dates);
            $m = array_search($dateTable[0], $mois) + 1;
            $model->setTable("vente v, produit p");
            $model->setChamp("*");
            $model->setClause("MONTH(v.date_vente) = ".$m." AND YEAR(v.date_vente) = ".$dateTable[1]." AND v.id_produit=p.id");
            $ventes = $model->getData();
            $total = 0;
            for($i=0;$i<count($ventes);$i++){
                $total += intval($ventes[$i]->total);
            }
            include_once("./base/views/bilan_detail.php");
            break;

        case "export":
            $model->setTable("vente v, produit p");
            $model->setChamp("*");
            $model->setClause("DAY(v.date_vente) = ".date("d")." AND MONTH(v.date_vente) = ".date('m')." AND YEAR(v.date_vente) = ".date('Y')." AND v.id_produit=p.id");
            $ventes = $model->getData();
            $total = 0;
            for($i=0;$i<count($ventes);$i++){
                $total += intval($ventes[$i]->total);
            }
            include_once("./base/views/export.php");
            break;
    }