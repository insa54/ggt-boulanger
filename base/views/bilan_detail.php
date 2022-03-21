    <?php include "_header.php"; ?>
    <?php include '_inc_navbar.php'; ?>

    <div class="container my-5">
        <button onclick="export2csv('exportT')" class="btn btn-outline-primary"><i class="las la-file-download"></i> Exporter</button>
        <table class="table table-bordered mt-5" id="exportT">
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
    <?php include "_footer.php"; ?>

    