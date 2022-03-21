<?php include "_header.php"; ?>

<section id="login" class="page__login">
    <div class="container __login_box bg-light py-5 text-center">
        <div id="login-row" class="justify-content-center align-items-center">
            <div id="login-box">
                <form id="login-form" class="form" action="" method="post">
                    <h1 class="fs-4 text-center">Se connecter</h1>
                    <div class="form-group mb-2">
                        <input type="text" name="email" id="email" class="form-control">
                    </div>
                    <div class="form-group mb-2">
                        <input type="password" name="mdp" id="mdp" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="remember-me">
                            <input id="remember-me" name="remember-me" type="checkbox"></span>
                            <span>Se souvenir de moi</span>
                        </label>
                        <input type="submit" name="submit" class="btn btn-warning btn-md mt-2" value="Connexion">
                    </div>
                    <div id="register-link" class="text-right mt-4">
                        <a href="#" class="text-warning">Inscrivez-vous ici</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

<?php include "_footer.php"; ?>
    
