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
                $table = "vendors";
                $insertReturnInfo = insertTable($conn, $table, $data);
                echo $insertReturnInfo;
                // var_dump($insertReturnInfo);
                // print_r($data);
                close_database_connection($conn);
            }
        }
    } catch (PDOException $e) {
        $response = array("error" => "Connection failure: " . $e->getMessage());
        echo json_encode($response);
    }
?>