<?php
    include 'functions.php';
    // header('Content-Type: application/json');
    $conn = open_database_connection();
    $vendorID = $_GET['selectedValue'];;
    $vedorInfo = populateVendorInfo($conn, $vendorID);
    // var_dump($vedorInfo);
    echo json_encode($vedorInfo);
    close_database_connection($conn);

    function populateVendorInfo($conn, $vendor_id){
        $options = array();

        $query = "SELECT * FROM Vendors WHERE vendorId=?";
        $stmt = $conn->prepare($query);
        $stmt->execute([$vendor_id]);
        $stmt->execute();

        while ($rows = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $options[] = array(
                    'vendorID' => $rows["VendorID"],
                    'vendorName' => $rows["VendorName"],
                    'GSTNo' => $rows["GSTNo"],
                    'Email' => $rows["Email"],
                    'Phone' => $rows["Phone"],
                    'Address' => $rows["Address"],
                    'City' => $rows["City"],
                    'Province' => $rows["Province"],
                    'Zip' => $rows["Zip"],
                    'Membership' => $rows["Membership"]
                );
            }
        return $options;
    }
?>