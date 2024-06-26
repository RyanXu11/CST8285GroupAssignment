<?php
include_once 'functions.php';

$conn = open_database_connection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    if (!isset($data['MemberID'], $data['password'])) {
        $error = array("error" => 'Missing POST parameters');
    } else {
        // Access the parameters from the decoded JSON data
        $MemberID = $data['MemberID'];
        $password = $data['password'];
    }

    try {
        $memberId = $MemberID;
        $password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE familymembers SET password = :password WHERE MemberID = :MemberID";
        $stmt = $conn->prepare($sql);
        $stmt->execute([':password' => $password, ':MemberID' => $memberId]);

        header('Content-Type: application/json');
        $response = array('success' => true);
        echo json_encode($response);
    } catch (PDOException $e) {
        $error = array(
            "code" => 501, // User defined error code
            "message" => 'Password reset failed: ' . $e->getMessage()
        );
        echo json_encode($error);
        
    }
} else {
    $error = array(
        "code" => 405, // User defined error code
        "message" => 'Invalid request method.'
    );
    echo json_encode($error);
}

close_database_connection($conn);
?>