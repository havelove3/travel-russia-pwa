<?php
// Данные для подключения к БД в OpenServer
$servername = "localhost";
$username = "root";
$password = ""; // Пароль, если вы его устанавливали
$dbname = "travel_feedback";

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Обработка данных формы
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Очистка данных
    $name = htmlspecialchars(strip_tags($_POST['name']));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(strip_tags($_POST['message']));
    
    // Валидация
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Некорректный email");
    }
    
    // Подготовленный запрос для безопасности
    $stmt = $conn->prepare("INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);
    
    if ($stmt->execute()) {
        echo "Отзыв успешно отправлен!";
    } else {
        echo "Ошибка: " . $stmt->error;
    }
    
    $stmt->close();
}

// Получение отзывов для отображения
$sql = "SELECT name, message, created_at FROM feedback ORDER BY created_at DESC LIMIT 10";
$result = $conn->query($sql);

$feedback = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $feedback[] = $row;
    }
}

$conn->close();

// Для AJAX запросов возвращаем JSON
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    header('Content-Type: application/json');
    echo json_encode($feedback);
    exit;
}
?>