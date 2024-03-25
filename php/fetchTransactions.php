<?php
    date_default_timezone_set("America/Toronto");
    include 'functions.php';
    $conn = open_database_connection();
    // header('Content-Type: application/json');
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $json_data = file_get_contents('php://input');
            $filterOptions = json_decode($json_data, true);

            if ($filterOptions === null) {
                http_response_code(400); //Bad Request
                echo json_encode(array('error' => 'Invalid JSON data'));
            } else {
                $data = fetchTransactions($conn, $filterOptions);
                // header('Content-Type: application/json');
                echo json_encode($data);
                close_database_connection($conn);
            }
        }
    } catch (PDOException $e) {
        die("Connection failure: " . $e->getMessage());
    }

    function fetchTransactions($conn, $filterOptions)
    {
        try {
            $VendorID = $filterOptions['VendorID'];
            $startDate = $filterOptions['startDate'];
            $endDate = $filterOptions['endDate'];
        
            $sql = "SELECT transactions.*, vendors.VendorName FROM transactions";
            $sql .= " LEFT JOIN vendors ON transactions.VendorID = vendors.VendorID WHERE 1=1";
            
            if ($VendorID != 0) {
                $sql .= " AND transactions.VendorID = :VendorID";
            }
    
            if ($startDate !== "") {
                $sql .= " AND TransactionDate >= :startDate";
            }
    
            if ($endDate !== "") {
                $sql .= " AND TransactionDate <= :endDate";
            }
    
            $stmt = $conn->prepare($sql);
    
            if ($VendorID != 0) {
                $stmt->bindParam(':VendorID', $VendorID);
            }
    
            if ($startDate !== "") {
                $stmt->bindParam(':startDate', $startDate);
            }
    
            if ($endDate !== "") {
                $stmt->bindParam(':endDate', $endDate);
            }
            
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($results === FALSE) {
                throw new Exception("Failed to fetch results from database.");
            } else {
                return json_encode($results);
            }
        } catch (Exception $e) {
            // return error message
            return json_encode(array('error' => $e->getMessage()));
        }
    }
?>