    <?php include "_header.php"; ?>
    <div class="container">
        <div id="login-row" class="row justify-content-center align-items-center">
            <div id="login-column" class="col-md-6">
                <div id="login-box" class="col-md-12">
                    <form id="login-form" class="form" action="" method="post">
                        <h3 class="text-center text-info">Ajout d'utilisateur</h3>
                        <div class="form-group">
                            <label for="nom" class="text-info">Votre nom:</label><br>
                            <input type="text" name="nom" id="nom" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="prenom" class="text-info">Votre prenom:</label><br>
                            <input type="text" name="prenom" id="prenom" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="email" class="text-info">Votre email:</label><br>
                            <input type="text" name="email" id="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="mdp" class="text-info">Mot de passe:</label><br>
                            <input type="password" name="mdp" id="mdp" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="profil" class="text-info">Type de compte:</label><br>
                            <select class="form-control" name="profil">
                                <option value="SIMPLE">Simple</option>
                                <option value="ADMIN">Administrateur</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btn btn-info btn-md" value="submit">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <?php include "_footer.php"; ?>

    