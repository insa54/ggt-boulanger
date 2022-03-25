    <?php include "_header.php"; ?>
    <?php include '_inc_navbar.php'; ?>

    <div class="container my-5">
        <button onclick="export2csv('exportT')" class="btn btn-outline-primary"><i class="las la-file-download"></i> Exporter</button>
        <table class="table table-bordered mt-5" id="exportT">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Libelle Produit</th>
                    <th scope="col">Prix Unitaire</th>
                    <th scope="col">Quantité/jour</th>
                    <th scope="col">Total/jour</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($allday as $k => $vente){ ?>
                    <?php for($i = 0; $i < count($vente); $i++){ ?>
                        <tr>
                            <?php if($i == 0){ ?><td rowspan="<?php echo count($vente); ?>"><?php echo $k; ?></td> <?php } ?>
                            <td><?php echo $vente[$i]->libelle; ?></td>
                            <td><?php echo $vente[$i]->prix; ?> XOF</td>
                            <td><?php echo $vente[$i]->totalqte; ?></td>
                            <td><?php echo $vente[$i]->totalsum; ?> XOF</td>
                        </tr>
                    <?php } ?>
                <?php } ?>
                <tr>
                    <th colspan="4">Total</th>
                    <td><?php echo $total; ?> XOF</td>
                </tr>
            </tbody>
        </table>
    
    </div>
    <?php include "_footer.php"; ?>

    