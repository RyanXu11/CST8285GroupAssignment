<?php
    include 'functions.php';
    // header('Content-Type: application/json');
    $conn = open_database_connection();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!isset($_POST['username'], $_POST['email'], $_POST['password'])) {
            echo 'Missing POST parameters';
            exit;
        }
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    
        try {
            $stmt = $conn->prepare('INSERT INTO familymembers (username, password, email) VALUES (?, ?, ?)');
            $stmt->execute([$username, $password, $email]);
            header('Content-Type: application/json');
            $response = array('success' => true);
            echo json_encode($response);
        } catch (PDOException $e) {
            echo 'Registration failed: ' . $e->getMessage();
        }
    } else {
        echo 'Invalid request method';
    }
    
    close_database_connection($conn);
?>