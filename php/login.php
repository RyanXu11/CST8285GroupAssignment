<?php
include_once 'functions.php';

$conn = open_database_connection();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['username'], $_POST['password'])) {
        http_response_code(400); // Bad request
        echo json_encode(array('error' => 'Missing username or password'));
        exit;
    }
    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        $stmt = $conn->prepare('SELECT * FROM familymembers WHERE username = ?');
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            header('Content-Type: application/json');
            $response = array('success' => true);
            echo json_encode($response);
        } else {
            http_response_code(401); // Unauthorized
            echo json_encode(array('error' => 'Invalid username or password'));
        }
    } catch (PDOException $e) {
        http_response_code(500); // Internal server error
        echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
    }
} else {
    http_response_code(405); // Method not allowed
    echo json_encode(array('error' => 'Invalid request method'));
}
?>