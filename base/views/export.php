    <?php include "_header.php"; ?>
    <div class="container mt-10">
        <input type="date" name="date_to_export" class="form-control" onchange="loadDocument('<?php echo HTTP_PATH; ?>/ajax/exportdate/'+this.value, 'table_exp', '','')">
        <button onclick="export2csv('exportT')" class="btn btn-primary">Exporter</button>
        <div id="table_exp">
            <table class="table" id="exportT">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
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
                        <td><?php echo $vente->libelle; ?></td>
                        <td><?php echo $vente->prix; ?> XOF</td>
                        <td><?php echo $vente->qte; ?></td>
                        <td><?php echo $vente->total; ?> XOF</td>
                    </tr>
                    <?php } ?>
                    <tr>
                        <th colspan="4">Total</th>
                        <td><?php echo $total; ?> XOF</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <?php include "_footer.php"; ?>

    