<?php
    include 'functions.php';
    // header('Content-Type: application/json');
    $conn = open_database_connection();
    $options = populateVendorOptions($conn);
    // var_dump($options);
    echo json_encode($options);
    close_database_connection($conn)
?>