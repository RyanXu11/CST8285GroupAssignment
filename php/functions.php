<?php
// This function is for connection the database
function open_database_connection()
{
    // Database information
    $servername = 'localhost:3306'; // server
    $username = 'xuUser'; // user
    $password = 'xuPassword123'; // password
    $dbname = 'cst8285_group'; // database

    try {
        //create the connection
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        die("Connection Failure: " . $e->getMessage());
    }
}


// This function is used to close the database connection
function close_database_connection($conn)
{
    // $conn->close();
    $conn = null;
}

// This function is used to insert data to talbe,
// the data must be json, and all keys name are same as columns name, the values are needed to be inserted
function insertTable($conn, $table, $data)
{
    $keys = array_keys($data);
    $fields = implode(", ", $keys);
    $placeholders = ":" . implode(", :", $keys);

    $stmt = $conn->prepare("INSERT INTO $table ($fields) VALUES ($placeholders)");

    foreach ($data as $key => $value) {
        $stmt->bindValue(":$key", $value);
    }

    if ($stmt->execute()) {
        $last_id = $conn->lastInsertId();
        // Return JSON response
        return json_encode(array('lastInsertId' => $last_id));
    } else {
        // Handle execution errors
        echo json_encode(array('error' => 'Failed to insert data'));
    }
}


function updateProduct($conn, $product_name)
{
    $sql = "INSERT INTO Products (ProductName) VALUES ('$product_name')";
    $conn->query($sql);
    return $conn->insert_id;
}


function populateVendorOptions($conn)
{
    $options = array();
    $query = "SELECT VendorID, VendorName FROM Vendors ORDER BY VendorName";
    $stmt = $conn->query($query);
    // var_dump($stmt);
    if ($stmt) {
        while ($rows = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $options[] = array(
                'vendorID' => $rows["VendorID"],
                'vendorName' => $rows["VendorName"]
            );
        }
    }
    // var_dump("This is output of populateVendorOptions:\n", $options);
    return $options;
}

function populateVendorInfo($conn, $vendor_id)
{
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

function populateVendorProductName($conn, $vendor_id)
{
    $options = array();
    $query = "SELECT VendorProductID, ProductName, ProductID FROM Products WHERE vendorId=?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$vendor_id]);
    $stmt->execute();
    // var_dump($stmt);
    if ($stmt) {
        while ($rows = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $options[] = array(
                'VendorProductID' => $rows["VendorProductID"],
                'ProductName' => $rows["ProductName"],
                'ProductID' => $rows['ProductID']
            );
        }
    }
    return $options;
}

function populateProductInfo($conn, $product_id)
{
    $options = array();
    $query = "SELECT * FROM Products WHERE ProductID=?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$product_id]);
    // $stmt->execute();

    if ($stmt) {
        while ($rows = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $options[] = array(
                'productName' => $rows["ProductName"],
                'vendorProductID' => $rows["VendorProductID"],
                'price' => $rows["LatestPrice"],
                'taxType' => $rows["TaxType"],
                'unit' => $rows["Unit"],
                'descriptions' => $rows["Descriptions"],
            );
        }
    }
    return $options;
}



?>