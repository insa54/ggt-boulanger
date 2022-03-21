<section class="page__nav">
    <div class="container">
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid col-lg-10">
                <a class="navbar-brand" href="#">
                    <img src="/base/assets/images/logo_le_croustillant.png" alt="Accueil" class="logo-principal" width="50px">
                </a>
                <button class="navbar-toggler border" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                   <i class="las la-bars text-light"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/"><i class="las la-tachometer-alt text-warning fs-4"></i> Accueil</a>
                        </li>
                        <?php if((isset($_SESSION[_USER_])) && ($_SESSION[_USER_]->profil == "ADMIN")){ ?>
                        <li class="nav-item">
                            <a class="nav-link" href="/bilan"><i class="las la-calculator text-warning fs-4"></i> Bilan</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/export"><i class="las la-file-download text-warning fs-4"></i> Export</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/user"><i class="las la-user-tag text-warning fs-4"></i> Utilisateur</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="las la-folder-plus text-warning fs-4"></i> Ajouter Produit</a>
                        </li>
                        <?php } ?>
                    </ul>
                </div>
            </div>
            <div class="d-flex justify-content-around col-lg-2 col-sm-4 col-12 mx-sm-auto">
                <button type="button" class="btn btn-outline-light position-relative" onclick="finaliser('<?php echo HTTP_PATH; ?>')">
                    <i class="lab la-opencart fs-3"></i> Panier
                    <?php if((isset($_SESSION["pagnet"])) && (count($_SESSION["pagnet"]) > 0)){ ?>
                    <span id="pagnet" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        <?php echo count($_SESSION["pagnet"]);?>
                    </span>
                    <?php } ?>
                </button>
                <?php if(!isset($_SESSION[_USER_])){ ?>
                <a class="btn btn-light" href="/login"><i class="las la-user-circle"></i> Connexion</a>
                <?php }else{ ?>
                <a class="btn btn-danger" href="/logout"><i class="las la-sign-out-alt fs-3"></i> Sortir</a>
                <?php } ?>
            </div>
        </nav>
    </div>
</section>