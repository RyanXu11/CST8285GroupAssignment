<?php
include 'functions.php';
// header('Content-Type: application/json');

$conn = open_database_connection();

$memberID = $_GET['memberID'];
$profile = getProfile($conn, $memberID);
// var_dump($vedorInfo);
echo json_encode($profile);

close_database_connection($conn);
function getProfile($conn, $memberID)
{
    try {
        // Prepare SQL query
        $query = "SELECT * FROM familymembers WHERE MemberID=?";
        $stmt = $conn->prepare($query);

        // Execute SQL query
        $stmt->execute([$memberID]);

        // Fetch single row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            // If row exists, return data
            return array(
                // 'MemberID' => $row["MemberID"],
                'login' => $row["username"],
                'email' => $row["email"],
            );
        } else {
            // If no row found, return empty array or handle as needed
            return array('error' => 'No data found');
        }
    } catch (PDOException $e) {
        // Handle database errors
        return array('error' => 'Database error: ' . $e->getMessage());
    }
}
?>