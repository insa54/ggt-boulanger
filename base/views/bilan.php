    <?php include "_header.php"; ?>
    <div class="container mt-5 mx-auto">
        <div class="list-group p-5 mx-auto">
            <?php foreach($allmois as $mois){ ?>
                <a href="<?php echo HTTP_PATH; ?>/bilan/detail/<?php echo $mois; ?>" class="list-group-item list-group-item-action" style="max-width: 500px;"><?php echo $mois; ?></a>
            <?php } ?>
        </div>
    
    </div>
    <?php include "_footer.php"; ?>

    