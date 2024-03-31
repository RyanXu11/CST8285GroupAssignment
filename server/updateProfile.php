<?php
include_once 'functions.php';

$conn = open_database_connection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    if ($data === null) {
        http_response_code(400); //Bad Request
        echo json_encode(array('error' => 'Invalid JSON data'));
    } else {
        try {
            $table = "familymembers";
            $updateReturnInfo = updateTable($conn, $table, $data);
            session_start();
            $_SESSION['username'] = $data['username'];
            session_write_close();
            $response = array('success' => true, 'username' => $_SESSION['username']);
            echo json_encode($response);
        } catch (PDOException $e) {
            $error = array(
                "code" => 501, // User defined error code
                "message" => 'Update profile failed: ' . $e->getMessage()
            );
            echo json_encode($error);
        }
    }
}
close_database_connection($conn);
?>