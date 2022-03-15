<?php
    switch($todo){
        case "addVente":
            $model->setTable("produit");
            $model->setChamp("*");
            $model->setClause("id=".$id);
            $produit = $model->getData()[0];
            include_once("./base/views/add_vente.php");
            break;
        case "exportdate":

            $model->setTable("vente v, produit p");
            $model->setChamp("*");
            $model->setClause("MONTH(v.date_vente) = ".date("m", strtotime($date))." AND DAY(v.date_vente) = ".date("d", strtotime($date))." AND YEAR(v.date_vente) = ".date("Y", strtotime($date))." AND v.id_produit=p.id");
            $ventes_d = $model->getData(true);
            $total = 0;
            for($i=0;$i<count($ventes_d);$i++){
                $total += intval($ventes_d[$i]->total);
            }
            include_once("./base/views/_inc_export.php");
            break;
    }