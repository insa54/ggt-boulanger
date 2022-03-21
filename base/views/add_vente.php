<div class="modal-header py-1">
    <h1 class="m-0 pt-2 text-primary"><?php echo $produit->libelle; ?></h1>
</div>
<div class="modal-body">
    <main class="container">
        <div class="row">
            <div class="col-lg-3">
                <img data-image="red" class="w-100 image_prod active rounded rounded-lg shadow img-thumbnail" src="../base/assets/images/<?php echo $produit->image; ?>" alt="">
            </div>
            <div class="col-lg-9">
                <!-- Product Description -->
                <div class="product-description">
                    <div class="m-0 fs-5 mt-4 mt-lg-0 text-muted">
                        <span> <?php echo $produit->description; ?> </span>
                        <!-- Product Pricing -->
                        <span class="product-price">
                            <span>à <?php echo number_format($produit->prix, 0, ',', ' '); ?> XOF</span>
                        </span>
                    </div>
                </div>
                <form method="post" action="produit/vendu">
                    <hr>
                    <!-- Product Configuration -->
                    <div class="product-configuration">
                        <input type="hidden" name="id_produit" value="<?php echo $produit->id; ?>">
                        <input type="hidden" name="prix" id="prixU" value="<?php echo $produit->prix; ?>">
                        <input type="hidden" name="total" id="prixT" value="<?php echo $produit->prix; ?>">
                        <input type="hidden" name="libelle" id="libelle" value="<?php echo $produit->libelle; ?>">
                        <!-- Product Color -->
                        <div class="product-color">
                            <div class="color-choose row d-flex align-items-center">
                                <div class="col-lg-4">
                                    <i class="text-dark">Quantité :</i>
                                </div>
                                <div class="col-lg-8">
                                    <div class="row d-flex align-items-center">
                                        <div class="col-3 align-middle">
                                            <i class="fs-3 las la-minus-circle text-danger" onclick="addQte('-')"></i>
                                        </div>
                                        <div class="col-6 align-middle">
                                            <input type="number" class="form-control w-100" id="qte" name="qte" value="1" readonly/>
                                        </div>
                                        <div class="col-3 align-middle">
                                            <i class="fs-3 las la-plus-circle text-success" onclick="addQte('+')"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Cable Configuration -->
                    </div>
                    <hr>
                    <div class="product-price fs-4 py-2 px-3 d-inline-block w-100" style="background:rgb(241 245 249);">
                        <span>Total : </span><b id="prixTSp"><?php echo number_format($produit->prix, 0, ',', ' '); ?> XOF</b>
                    </div>
                    <div class="product-price mt-3">
                        <button type="submit" class="cart-btn btn btn-dark btn-lg lh-1 w-100"><i class="las la-check-circle"></i>&nbsp; Valider</button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</div>
