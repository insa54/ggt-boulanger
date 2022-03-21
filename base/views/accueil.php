	<?php include "_header.php"; ?>
	<?php include '_inc_navbar.php'; ?>
	
	<section class="page__home">
		<div class="container mt-4">
		    <div class="row text-center">
		        <h1 class="">Bienvenue</h1>
		    </div>
		</div>
		<div class="container my-5 row mx-auto">
			<?php foreach($produits as $produit){ ?>
				<div class="col-md-4">
					<div class="card card__produit" onclick="addVente('<?php echo HTTP_PATH; ?>/ajax/addVente/<?php echo $produit->id; ?>')">
						<div class="row d-flex">
							<div class="col-md-12 col-lg-4">
								<img src="../base/assets/images/<?php echo $produit->image; ?>" class="img-fluid card__produit-image">
                                <!-- <div style="background-image: url('../base/assets/images/<?php echo $produit->image; ?>');background-repeat: no-repeat;background-position: center; background-size: cover;"></div> -->
							</div>
							<div class="col-md-12 col-lg-8">
								<div class="p-3">
									<h5 class="card-title m-0 text-truncate"><?php echo $produit->libelle; ?></h5>
									<p class="card-text m-0 text-truncate"><?php echo $produit->description; ?></p>
									<p class="card-text m-0"><small class="text-muted"><?php echo $produit->prix; ?> XOF</small></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			<?php } ?>
		</div>
	</section>

	<?php include "_footer.php"; ?>

	