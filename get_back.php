<?php
header('Content-Type: application/json');

// Подключение к БД (те же данные, что в process_feedback.php)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "travel_feedback";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$sql = "SELECT name, message, created_at FROM feedback ORDER BY created_at DESC";
$result = $conn->query($sql);

$feedback = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $feedback[] = $row;
    }
}

echo json_encode($feedback);
$conn->close();
?>