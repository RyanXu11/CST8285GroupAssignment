<?php
    include 'functions.php';
    // header('Content-Type: application/json');
    $conn = open_database_connection();
    $vendorID = $_GET['selectedValue'];;
    $vedorInfo = populateVendorInfo($conn, $vendorID);
    // var_dump($vedorInfo);
    echo json_encode($vedorInfo);
    close_database_connection($conn)
?>