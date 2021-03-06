<?php if ((isset($_SESSION["pagnet"])) && (count($_SESSION["pagnet"]) > 0)){ ?>
<div class="m-5">
    <table class="table table-bordered" id="exportT">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Libelle Produit</th>
                <th scope="col">Prix</th>
                <th scope="col">Quantité</th>
                <th scope="col">Total</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($_SESSION["pagnet"] as $k => $vente){ ?>
            <tr>
                <td><i class="las la-trash text-warning fs-4" onclick="delFormPagnet(<?php echo $k; ?>)"></i></td>
                <!-- <td><i class="fa-solid fa-circle-trash" onclick="delFormPagnet(<?php echo $k; ?>)">Supprimer</i></td>las la-user-tag text-warning fs-4 -->
                <td><?php echo $vente["libelle"]; ?></td>
                <td><?php echo $vente["prix"]; ?> XOF</td>
                <td><?php echo $vente["qte"]; ?></td>
                <td><?php echo number_format($vente["total"], 0, ',', ' '); ?> XOF</td>
            </tr>
            <?php } ?>
            <tr>
                <th colspan="4">Total</th>
                <td><?php echo number_format($allprod, 0, ',', ' '); ?> XOF</td>
            </tr>
        </tbody>
    </table>

    <form action="/vente/valider" method="post">
        <input type="number" class="form-control" placeholder="Somme recu" onkeyup="calculMonaie(this.value)">
        <input type="hidden" id="allprod" value="<?php echo $allprod; ?>">
        <input type="text" id="monaieR" class="mt-2 form-control" readonly placeholder="Monaie">
        <div class="d-flex">
            <button type="submit" class="mt-2 btn btn-success">Valider</button>
        </div>
    </form>
</div>
<?php }else { ?>
    <div class="m-5">
        <h3>Aucun produit dans votre pagnet</h3>
    </div>
<?php } ?>