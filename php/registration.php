<?php
include 'functions.php';

   // create connection
    $conn = open_database_connection();

    echo "Connection successfully\n";

    // Query to retrieve all tables in the current database
    $query = "SHOW TABLES";
    $stmt = $conn->query($query);

    // Fetch the results
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Output the tables
    echo "Tables in the database:\n";
    if (!empty($tables)) {
        foreach ($tables as $table) {
            echo $table . "\n";
        }
    } else {
        echo "No tables found in the database.\n";
    }

    // Query to read a table
    // $query = "SELECT * FROM vendors;";
    // $stmt = $conn->query($query);

    // Fetch the results
    // $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // print_r($rows);
    
    $query = "SELECT VendorID, VendorName FROM Vendors";
    $stmt = $conn->query($query);
    $rows = $stmt->fetch(PDO::FETCH_ASSOC);
    print_r($rows);

    // close the connection
    // $conn = null;
    close_database_connection($conn)
?>