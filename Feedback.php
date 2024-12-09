<?php
// Database connection setup
$host = 'localhost'; // Database host
$db = 'feedback'; // Database name
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
    $email = $_POST['email'];
    $feedback = $_POST['feedback'];

    // Validate input (ensure all fields are filled out)
    if (empty($email) || empty($feedback)) {
        echo "All fields are required!";
        exit();
    }

    // Prepare and bind the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO text (email, feedback) VALUES (?, ?)");
    $stmt->bind_param("ss",$email, $feedback);

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
