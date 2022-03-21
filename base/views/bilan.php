    <?php include "_header.php"; ?>
    <?php include '_inc_navbar.php'; ?>

    <section class="page__bilan mb-5">
        <div class="container mt-4">
            <div class="row text-center">
                <h1 class="">Bilan</h1>
            </div>
        </div>
        <div class="container mx-auto bg-primary border rounded col-lg-3 mx-auto">
            <div class="list-group p-4 d-flex w-100 justify-content-center">
                <?php foreach($allmois as $mois){ ?>
                    <a href="<?php echo HTTP_PATH; ?>/bilan/detail/<?php echo $mois; ?>" class="list-group-item list-group-item-action"><?php echo $mois; ?></a>
                <?php } ?>
            </div>
        </div>
    </section>

    <?php include "_footer.php"; ?>

    