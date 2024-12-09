document.getElementById("feedback-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Display success message
    document.getElementById("success-message").style.display = "block";

    // Clear form fields
    this.reset();
});
