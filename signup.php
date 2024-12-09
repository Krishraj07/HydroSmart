<?php
// Database connection setup
$host = 'localhost'; // Database host
$db = 'user_database'; // Database name
$user = 'root'; // MySQL username
$pass = ''; // MySQL password

// Connect to MySQL
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['nm'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validate input (ensure all fields are filled out)
    if (empty($name) || empty($email) || empty($password)) {
        echo "All fields are required!";
        exit();
    }

    // Hash the password for security
    // $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Prepare and bind the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $password);

    // Execute the statement
    if ($stmt->execute()) {
        header("Location: http://localhost/FinalProject/home2.html");
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
}

$conn->close();
?>
