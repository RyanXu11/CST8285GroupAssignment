<?php
// Database information
$host = 'localhost:3306'; // server
$username = 'xuUser'; // user
$password = 'xuPassword123'; // password
$database = 'cst8285_group'; // database

try {
    // create connection
    $conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);

    // set PDO error mode as exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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

    // close the connection
    $conn = null;
} catch (PDOException $e) {
    echo "Connection failure: " . $e->getMessage();
}
?>
