<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modifier le produit</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <form action="produit/ajout" method="post" enctype="multipart/form-data">
        <div class="modal-body">
            <div class="mb-3">
                <label for="libelle" class="form-label">Libelle produit</label>
                <input type="text" name="libelle" class="form-control" value="<?php echo $prod->libelle; ?>" id="libelle">
            </div>
            <div class="mb-3">
                <label for="number" class="form-label">Prix unitaire</label>
                <input type="text" name="prix" class="form-control" value="<?php echo $prod->prix; ?>" id="prix">
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" name="description" id="description" rows="3"><?php echo $prod->description; ?></textarea>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Image du produit</label>
                <input type="file" name="image" class="form-control" id="image">
                <input type="hidden" name="id" value="<?php echo $prod->id; ?>" />
            </div>
            <div class="mb-3">
                <input type="submit" class="btn btn-success" value="Ajouter">
            </div>
        </div>
    </form>
</div>