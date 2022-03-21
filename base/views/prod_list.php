    <?php include "_header.php"; ?>
    <?php include '_inc_navbar.php'; ?>

    <div class="container my-5">
        <a class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="las la-user-plus"></i> Nouveau produit</a>
        <table class="table table-bordered mt-5" id="exportT">
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">libelle</th>
                    <th scope="col">Description</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Actif</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($produits as $produit){ ?>
                <tr>
                    <td><img src="../base/assets/images/<?php echo $produit->image; ?>" class="rounded" style="width 50px; height: 50px;"></td>
                    <td><?php echo $produit->libelle; ?></td>
                    <td><?php echo $produit->description; ?></td>
                    <td><?php echo $produit->prix; ?></td>
                    <td><?php if($produit->actif == 0){ echo "<span class='badge bg-success'>Actif</span>"; }else { echo "<span class='badge bg-danger'>Archivé</span>"; }?></td>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Action
                            </button>
                            <ul class="dropdown-menu">
                                <?php if($produit->actif != 0){ ?>
                                <li><a class="dropdown-item" href="/produit/activer/<?php echo $produit->id; ?>">Activer</a></li>
                                <?php } ?>
                                <?php if($produit->actif == 0){ ?>
                                <li><a class="dropdown-item" href="/produit/archiver/<?php echo $produit->id; ?>">Archiver</a></li>
                                <?php } ?>
                                <?php if($produit->actif != 0){ ?>
                                <li><a class="dropdown-item" href="/produit/delete/<?php echo $produit->id; ?>">Supprimer</a></li>
                                <?php } ?>
                            </ul>
                        </div>    
                    </td>
                </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>

    <?php include "_footer.php"; ?>

    