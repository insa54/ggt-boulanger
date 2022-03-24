<table class="table" id="exportT">
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
                <?php foreach($ventes_d as $vente){ ?>
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