    <?php include "_header.php"; ?>
    <div class="container mt-5 row mx-auto">
        <?php foreach($produits as $produit){ ?>
        <div class="card col-md-3 m-5" style="max-width: 440px;" onclick="addVente('<?php echo HTTP_PATH; ?>/ajax/addVente/<?php echo $produit->id; ?>')">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="../base/assets/images/<?php echo $produit->image; ?>" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title"><?php echo $produit->libelle; ?></h5>
                        <p class="card-text"><?php echo $produit->description; ?></p>
                        <p class="card-text"><small class="text-muted"><?php echo $produit->prix; ?> XOF</small></p>
                    </div>
                </div>
            </div>
        </div>
        <?php } ?>
    </div>
    <?php include "_footer.php"; ?>

    