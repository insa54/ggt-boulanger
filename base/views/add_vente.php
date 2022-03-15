
<div class="modal-body">
    <main class="containerm">
 
        <!-- Left Column / Headphones Image -->
        <div class="left-column">
            <img data-image="red" class="float-start image_prod active" src="../base/assets/images/<?php echo $produit->image; ?>" alt="">
        </div>
        
        
        <!-- Right Column -->
        <div class="right-column">
        
            <!-- Product Description -->
            <div class="product-description">
                <h1><?php echo $produit->libelle; ?></h1>
                <p><?php echo $produit->description; ?></p>
            </div>

            <form method="post" action="produit/vendu">
            <!-- Product Configuration -->
                <div class="product-configuration">
                    <input type="hidden" name="id_produit" value="<?php echo $produit->id; ?>">
                    <input type="hidden" name="prix" id="prixU" value="<?php echo $produit->prix; ?>">
                    <input type="hidden" name="total" id="prixT" value="<?php echo $produit->prix; ?>">
                    <input type="hidden" name="libelle" id="libelle" value="<?php echo $produit->libelle; ?>">
                    <!-- Product Color -->
                    <div class="product-color">
                        <span>Quantité</span>
                
                        <div class="color-choose row">
                            <div class="col-1">
                                <i class="fa-solid fa-circle-plus" onclick="addQte('+')"></i>
                            </div>
                            <div class="col-1 align-middle">
                                <i class="fa-solid fa-circle-minus" onclick="addQte('-')"></i>
                            </div>
                            <div class="col-6">
                                <input type="number" class="form-control" id="qte" name="qte" value="1" readonly/>
                            </div>
                        </div>
                
                    </div>
                    
                    <!-- Cable Configuration -->
                
                </div>
            
                <!-- Product Pricing -->
                <div class="product-price">
                    <span>Prix <?php echo number_format($produit->prix, 0, ',', ' '); ?> XOF</span>
                </div>
                <div class="product-price">
                    <span>Total </span><span id="prixTSp"><?php echo number_format($produit->prix, 0, ',', ' '); ?> XOF</span>
                </div>
                <div class="product-price">
                    <Button type="submit" class="cart-btn">Valider</Button>
                </div>
            </form>
        </div>
    </main>
</div>
