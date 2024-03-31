<?php
    include 'functions.php';
    // header('Content-Type: application/json');
    $conn = open_database_connection();
    $productID = $_GET['selectedValue'];;
    $productInfo = populateProductInfo($conn, $productID);
    // var_dump($productInfo);
    echo json_encode($productInfo);
    close_database_connection($conn)
?>