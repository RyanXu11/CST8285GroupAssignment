<?php

try {
    // create connection
    $conn = open_database_connection();

    echo "Connection successfully\n";

    $vendor_name = $_POST['vendor_name'];
    $gst_no = $_POST['gst_no'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $province = $_POST['province'];
    $country = $_POST['country'];
    $zip = $_POST['zip'];
    $membership = $_POST['membership'];

    $invoice_number = $_POST['invoice_number'];
    $transaction_date = $_POST['transaction_date'];
    $transaction_time = $_POST['transaction_time'];
    $subtotal = $_POST['subtotal'];
    $total_tax = $_POST['total_tax'];
    $tips = $_POST['tips'];
    $description = $_POST['description'];

    $product_name = $_POST['product_name'];
    $quantity = $_POST['quantity'];
    $price = $_POST['price'];

    $sql = "INSERT INTO Vendors (VendorName, GSTNo, Email, Phone, Address, City, Province, Country, ZIP, Membership) VALUES ('$vendor_name', '$gst_no', '$email', '$phone', '$address', '$city', '$province', '$country', '$zip', '$membership')";
    $conn->query($sql);

    $vendor_id = $conn->insert_id;

    $sql = "INSERT INTO Transactions (MemberID, VendorID, InvoiceNumber, TransactionDate, TransactionTime, Subtotal, TotalTax, Tips, Descriptions) VALUES (1, $vendor_id, '$invoice_number', '$transaction_date', '$transaction_time', '$subtotal', '$total_tax', '$tips', '$description')";
    $conn->query($sql);

    $transaction_id = $conn->insert_id;

    $sql = "INSERT INTO Products (ProductName) VALUES ('$product_name')";
    $conn->query($sql);

    $product_id = $conn->insert_id;

    $sql = "INSERT INTO Transaction_Details (TransactionID, ProductID, Quantity, Price) VALUES ($transaction_id, $product_id, '$quantity', '$price')";
    $conn->query($sql);

    // close the connection
    $conn = null;
} catch (PDOException $e) {
    echo "Connection failure: " . $e->getMessage();
}

?>