<html>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="./base/assets/css/style.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Commander</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Accueil</a>
                        </li>
                        <?php if((isset($_SESSION[_USER_])) && ($_SESSION[_USER_]->profil == "ADMIN")){ ?>
                        <li class="nav-item">
                            <a class="nav-link" href="/bilan">Bilan</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/export">Export</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/user">Utilisateur</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal">Ajouter Produit</a>
                        </li>
                        <?php } ?>
                    </ul>
                </div>
            </div>
            <div class="d-flex">
                <button type="button" class="btn btn-primary position-relative" onclick="finaliser('<?php echo HTTP_PATH; ?>')">
                    <i class="fa-solid fa-cart-shopping">
                    </i>
                    <?php if((isset($_SESSION["pagnet"])) && (count($_SESSION["pagnet"]) > 0)){ ?>
                    <span id="pagnet" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        <?php echo count($_SESSION["pagnet"]);?>
                    </span>
                    <?php } ?>
                </button>
                <?php if(!isset($_SESSION[_USER_])){ ?>
                <a class="nav-link" href="/login">Connexion</a>
                <?php }else{ ?>
                <a class="nav-link" href="/logout">Deconnexion</a>
                <?php } ?>
            </div>
        </nav>
    </div>