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
                $data = fetchTransactionDetails($conn, $filterOptions);
                // header('Content-Type: application/json');
                echo json_encode($data);
                close_database_connection($conn);
            }
        }
    } catch (PDOException $e) {
        die("Connection failure: " . $e->getMessage());
    }

    function fetchTransactionDetails($conn, $filterOptions)
    {
        try {
            $TransactionID = $filterOptions['TransactionID'];
        
            $sql = "SELECT ROW_NUMBER() OVER() AS rowNumber, VendorProductID, ProductName, Quantity, ";
            $sql .= "Unit, Price, TaxType, TransactionDetailID FROM transactionDetails";
            $sql .= " LEFT JOIN products ON transactionDetails.ProductID = products.ProductID WHERE TransactionID=:TransactionID";
            
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':TransactionID', $TransactionID);
            $stmt->execute();
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($results === FALSE) {
                throw new Exception("Failed to fetch results from database.");
            } else {
                // Iterate through the results and adjust Quantity if Unit is empty or null
                foreach ($results as &$row) {
                    if (empty($row['Unit']) || is_null($row['Unit'])) {
                        // Adjust Quantity
                        $row['Quantity'] = intval($row['Quantity']);
                    }
                }
                unset($row); // Unset reference to last element

                // Encode adjusted results to JSON format and return           
                return json_encode($results);
            }
        } catch (Exception $e) {
            // return error message
            return json_encode(array('error' => $e->getMessage()));
        }
    }
?>