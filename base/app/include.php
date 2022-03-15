<?php
    include_once '_func.php';
    include_once 'connect.php';
    include_once 'Model.class.php';
    include_once 'Param.class.php';

    const _USER_ = "connecte";
    const PROTOCOLE = "http://";
    
    $dao = _connect(HOST, USER, PASS, S_DB);
    
    $server = filter_input_array(INPUT_SERVER);

    extract($server);

    $route = $DOCUMENT_ROOT;

    define('HTTP_PATH', PROTOCOLE . $HTTP_HOST);

    $get = filter_input_array(INPUT_GET); # On récupère la varibale module et les autres variables passées par get dans l'URL.

    if ($get) {
        extract($get);
    }

    if(isset($_SESSION['notification']['erreur'])){
        $erreur = $_SESSION['notification']['erreur'];
        unset($_SESSION['notification']['erreur']);
    }

    if(isset($_SESSION['notification']['success'])){
        $success = $_SESSION['notification']['success'];
        unset($_SESSION['notification']['success']);
    }