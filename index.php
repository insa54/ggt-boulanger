<?php
    session_start();

    include './base/app/include.php';

    $model = new Model($dao, '');
    $admin = [""];
    if(in_array($action, $admin)){
        header('location:login');
    }

    if((!isset($_SESSION[_USER_])) && ($action != "login")){
        header('location:login');
    }
    
    require "./base/controller/" . $controller . ".php";

