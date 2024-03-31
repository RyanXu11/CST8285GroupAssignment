<?php
    include 'functions.php';
    // header('Content-Type: application/json');
    $conn = open_database_connection();

    $vendorID = $selectedValue = $_GET['selectedValue'];;
    $productInfo = populateVendorProductName($conn, $vendorID);
    // var_dump($vedorInfo);
    echo json_encode($productInfo);
    close_database_connection($conn)
?>