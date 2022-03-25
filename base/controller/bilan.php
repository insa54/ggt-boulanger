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
            $model->setChamp("p.*, SUM(v.total) as totalsum, SUM(v.qte) as totalqte, v.*");
            $model->setClause("MONTH(v.date_vente) = ".$m." AND YEAR(v.date_vente) = ".$dateTable[1]." AND v.id_produit=p.id GROUP BY CAST(v.date_vente AS DATE), v.id_produit");
            $ventes = $model->getData(true);
            //SELECT p.*, SUM(v.total) as total, SUM(v.qte) as totalqte, v.*, u.* FROM vente v, produit p WHERE v.id_produit=p.id AND MONTH(v.date_vente) = 3 AND YEAR(v.date_vente) = 2022 GROUP BY CAST(v.date_vente AS DATE), v.id_produit;
            //SELECT p.*, SUM(v.total) as total, SUM(v.qte) as totalqte, v.*, u.* FROM vente v, produit p, users u WHERE v.id_produit=p.id AND u.id=v.id_user GROUP BY CAST(v.date_vente AS DATE), v.id_produit;
            $allday = [];
            foreach($ventes as $data){
                $txt = date("d",strtotime($data->date_vente)) .'-'. $mois[date("n",strtotime($data->date_vente))-1].'-'.date("Y",strtotime($data->date_vente));
                $allday[$txt][] = $data;
            }

            $total = 0;
            for($i=0;$i<count($ventes);$i++){
                $total += intval($ventes[$i]->totalsum);
            }
            include_once("./base/views/bilan_detail.php");
            break;

        case "export":
            $clause = "1=1";
            if((isset($_GET['date_to_export'])) && ($_GET["date_to_export"] != "")){
                $date = $_GET['date_to_export'];
                $clause .=  " AND MONTH(v.date_vente) = ".date("m", strtotime($date))." AND DAY(v.date_vente) = ".date("d", strtotime($date))." AND YEAR(v.date_vente) = ".date("Y", strtotime($date))." AND v.id_produit=p.id AND v.id_user=u.id";
            }else{
                $clause .= " AND DAY(v.date_vente) = ".date("d")." AND MONTH(v.date_vente) = ".date('m')." AND YEAR(v.date_vente) = ".date('Y')." AND v.id_produit=p.id AND v.id_user=u.id";
            }

            if((isset($_GET["nom"])) && ($_GET["nom"] != "")){
                $nom = $_GET["nom"];
                $clause .= " AND (u.nom like '%".$nom."%' OR u.prenom like '%".$nom."%' OR p.libelle like '%".$nom."%')";
            }
            // $model->setTable("vente");
            // $num = $model->getCount("id", true);
            // $page=1;
            // if(isset($_GET["page"])){
            //     $page = $_GET["page"];
            // }
            // $limit = 1;
            // $pagination = pagination($num, $limit, $page);
            // $startpoint = ($page * $limit) - $limit;

            $model->release();
            $model->setTable("vente v, produit p, users u");
            $model->setChamp("*");
            $model->setClause($clause);
            // $model->setLimit($startpoint . ',' . $limit);
            $ventes = $model->getData(true);
            $total = 0;
            for($i=0;$i<count($ventes);$i++){
                $total += intval($ventes[$i]->total);
            }
            include_once("./base/views/export.php");
            break;
    }