<?php
    include_once 'functions.php';

    $conn = open_database_connection();
    try {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $json_data = file_get_contents('php://input');
            $data = json_decode($json_data, true);
            // var_dump($data);
            if ($data === null) {
                http_response_code(400); //Bad Request
                echo json_encode(array('error' => 'Invalid JSON data'));
            } else {
                // update transactiondetails
                $table = "transactiondetails";
                updateTable($conn, $table, $data);

                // Get the $data for transactions
                $data2 = dataOfTransaction($conn, $data);
                echo json_encode($data2);
                // update transactions
                $table = "transactions";
                $updateReturnInfo = updateTable($conn, $table, $data2);
                // echo $updateReturnInfo;
                // var_dump($insertReturnInfo);
                // print_r($data);
                close_database_connection($conn);
            }
        }
    } catch (PDOException $e) {
        die("Connection failure: " . $e->getMessage());
    }

    function dataOfTransaction($conn, $data) {
        //The first value is TransactionDetailID
        $TransactionDetailID = reset($data);
        // Get the TransactionID from transactionDetails
        $sql = "SELECT TransactionID FROM transactionDetails WHERE TransactionDetailID = :TransactionDetailID";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':TransactionDetailID', $TransactionDetailID);
        $stmt->execute();
        $TransactionID = $stmt->fetchColumn();
        
        // Calcuate
        $sql = "SELECT 
                    td.TransactionID,
                    COALESCE(SUM(td.Price * td.Quantity), 0) AS Subtotal,
                    COALESCE(SUM(CASE 
                            WHEN p.TaxType = 'H' THEN td.Price * td.Quantity * 0.13 
                            WHEN p.TaxType = 'G' THEN td.Price * td.Quantity * 0.05 
                            ELSE 0 
                        END), 0) AS TotalTax
                FROM 
                    transactionDetails td
                INNER JOIN 
                    products p ON td.ProductID = p.ProductID
                WHERE 
                    td.TransactionID = :TransactionID
                GROUP BY 
                    td.TransactionID";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':TransactionID', $TransactionID);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        // Get Subtotal and TotalTax from $result
        $Subtotal = $result['Subtotal'];
        $TotalTax = $result['TotalTax'];

        // prepare $data for update
        $data = array(
            "TransactionID" => $TransactionID,
            "Subtotal" => $Subtotal,
            "TotalTax" => $TotalTax
        );
        return $data;
    }
?>