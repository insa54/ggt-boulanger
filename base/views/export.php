    <?php include "_header.php"; ?>
    <?php include '_inc_navbar.php'; ?>

    <div class="container my-5">
        <form action="" method="get">
            <div class="row mb-4">
                <div class="col-md-5">
                    <!-- <input type="date" name="date_to_export" class="form-control" onchange="loadDocument('<?php echo HTTP_PATH; ?>/ajax/exportdate/'+this.value, 'table_exp', '','')"> -->
                    <input type="date" name="date_to_export" class="form-control"/>
                </div>
                <div class="col-md-5">
                    <input type="text" placeholder="Nom du vendeur" name="nom" class="form-control"/>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary">Rechercher</button>
                </div>
            </div>
        </form>
        <button onclick="export2csv('exportT')" class="btn btn-primary">Exporter</button>
        <div id="table_exp" class="mt-5">
            <table class="table table-bordered" id="exportT">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Vendeur</th>
                        <th scope="col">Libelle Produit</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Quantité</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($ventes as $vente){ ?>
                    <tr>
                        <td><?php echo $vente->date_vente; ?></td>
                        <td><?php echo $vente->prenom ." ".$vente->nom; ?></td>
                        <td><?php echo $vente->libelle; ?></td>
                        <td><?php echo $vente->prix; ?> XOF</td>
                        <td><?php echo $vente->qte; ?></td>
                        <td><?php echo $vente->total; ?> XOF</td>
                    </tr>
                    <?php } ?>
                    <tr>
                        <th colspan="5">Total</th>
                        <td><?php echo $total; ?> XOF</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <?php include "_footer.php"; ?>

    