<!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ajouter un produit</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="produit/ajout" method="post">
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="model_add_vente" tabindex="-1" aria-labelledby="Modal vente" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" id="modal_vente">

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
    <script src="../../base/assets/js/jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <!-- <script src="../base/assets/js/ajax.js"></script> -->
    <script src="../../base/assets/js/script.js"></script>
</body>

</html>