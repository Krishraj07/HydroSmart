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
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Validate input (ensure all fields are filled out)
    if (empty($email) || empty($password)) {
        echo "Both email and password are required!";
        exit();
    }

    // Prepare and bind SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);

    // Execute the statement
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Bind the result variable (only one column is selected: password)
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        // Verify the password using password_verify() function
        if ($password == $hashed_password) {
            // Redirect to the dashboard or home page
            header("Location: http://localhost/FinalProject/home2.php");
            exit();
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "No account found with that email!";
    }

    // Close the statement
    $stmt->close();
}

$conn->close();
?>