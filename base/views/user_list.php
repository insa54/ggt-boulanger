    <?php include "_header.php"; ?>
    <div class="container mt-10">
        <a href="/user/ajout" class="btn btn-primary">Nouvel utilisateur</a>
        <table class="table" id="exportT">
            <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prenom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type utilisteur</th>
                    <th scope="col">Actif</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($users as $user){ ?>
                <tr>
                    <td><?php echo $user->nom; ?></td>
                    <td><?php echo $user->prenom; ?></td>
                    <td><?php echo $user->email; ?></td>
                    <td><?php echo $user->profil; ?></td>
                    <td><?php if($user->actif == 0){ echo "<span class='badge bg-success'>Actif</span>"; }else { echo "<span class='badge bg-danger'>Archivé</span>"; }?></td>
                    <td>
                        <div class="btn-group">
                            <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Action
                            </button>
                            <ul class="dropdown-menu">
                                <?php if($user->actif != 0){ ?>
                                <li><a class="dropdown-item" href="/user/activer/<?php echo $user->id; ?>">Activer</a></li>
                                <?php } ?>
                                <?php if($user->actif == 0){ ?>
                                <li><a class="dropdown-item" href="/user/archiver/<?php echo $user->id; ?>">Archiver</a></li>
                                <?php } ?>
                                <?php if($user->actif != 0){ ?>
                                <li><a class="dropdown-item" href="/user/delete/<?php echo $user->id; ?>">Supprimer</a></li>
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

    