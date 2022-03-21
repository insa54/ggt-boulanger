	<footer class="bg-light py-3">
		<div class="container">
			<div class="row">
				<div class="col-12 text-center">
					© 2022 LE CROUSTILLANT, Tous Droits Réservés
				</div>
			</div>
		</div>
	</footer>
	<!-- Modal -->
	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Ajouter un produit</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<form action="produit/ajout" method="post" enctype="multipart/form-data">
					<div class="modal-body">
						<div class="mb-3">
							<label for="libelle" class="form-label">Libelle produit</label>
							<input type="text" name="libelle" class="form-control" id="libelle">
						</div>
						<div class="mb-3">
							<label for="number" class="form-label">Prix unitaire</label>
							<input type="text" name="prix" class="form-control" id="prix">
						</div>
						<div class="mb-3">
							<label for="description" class="form-label">Description</label>
							<textarea class="form-control" name="description" id="description" rows="3"></textarea>
						</div>
						<div class="mb-3">
							<label for="image" class="form-label">Image du produit</label>
							<input type="file" name="image" class="form-control" id="image">
						</div>
                        <div class="mb-3">
							<input type="submit" class="btn btn-success" value="Ajouter">
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="modal fade" id="model_add_vente" tabindex="-1" aria-labelledby="Modal vente" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" id="modal_vente">

			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Ajout d'utilisateur</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div id="login-box" class="col-md-12">
					    <form id="login-form" class="form" action="" method="post">
					        <div class="row">
					        	<div class="col-lg-6 form-group mb-3">
					        	    <input type="text" name="nom" id="nom" class="form-control" placeholder="Votre nom">
					        	</div>
					        	<div class="col-lg-6 form-group mb-3">
					        	    <input type="text" name="prenom" id="prenom" class="form-control" placeholder="Votre prenom">
					        	</div>
					        </div>
					        <div class="form-group mb-3">
					            <input type="text" name="email" id="email" class="form-control" placeholder="Votre email">
					        </div>
					        <div class="form-group mb-3">
					            <input type="password" name="mdp" id="mdp" class="form-control" placeholder="Mot de passe">
					        </div>
					        <div class="form-group mb-3">
					            <label for="profil">Type de compte:</label><br>
					            <select class="form-control" name="profil">
					                <option value="SIMPLE">Simple</option>
					                <option value="ADMIN">Administrateur</option>
					            </select>
					        </div>
					        <div class="form-group text-center">
					            <input type="submit" class="btn btn-warning btn-md" value="Enregistrer l'utilisateur">
					        </div>
					    </form>
					</div>
				</div>
			</div>
		</div>
	</div>

	<?php if (isset($erreur)){ ?>
		<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
			<div class="toast align-items-center text-white bg-danger border-0" role="alert" <?php if(isset($erreur)){ echo "id='errorMsg'"; } ?>>
				<div class="d-flex">
					<div class="toast-body">
						<?php echo $erreur; ?>
					</div>
					<button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="closeToast('errorMsg')" aria-label="Close"></button>
				</div>
			</div>
		</div>
	<?php } ?>
	<?php if (isset($success)){ ?>
		<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
			<div style="z-index: 100" class="toast align-items-center text-white bg-success border-0" role="alert" <?php if(isset($success)){ echo "id='successMsg'"; } ?>>
				<div class="d-flex">
					<div class="toast-body">
						<?php echo $success; ?>
					</div>
					<button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="closeToast('successMsg')" aria-label="Close"></button>
				</div>
			</div>
		</div>
	<?php } ?>
	<!-- <script src="../../base/assets/js/jquery.js"></script> -->
	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	<!-- <script src="../base/assets/js/ajax.js"></script> -->
	<script src="../../base/assets/js/script.js"></script>

</body>
</html>