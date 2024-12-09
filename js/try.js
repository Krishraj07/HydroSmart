function swapForms(activeButton) {
    const signInForm = document.getElementById('sign-in-info');
    const signUpForm = document.getElementById('sign-up-info');
    const overlay = document.getElementById('overlay');

    if (activeButton === 'Log In') {
        overlay.classList.remove('open-sign-up');
        overlay.classList.add('open-sign-in');
        signUpForm.style.display = 'none';
        signInForm.style.display = 'block';
    } else {
        overlay.classList.remove('open-sign-in');
        overlay.classList.add('open-sign-up');
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
    }
}

function submitForm(formType) {
const signInForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');

if (formType === 'login') {
    // Login form submission logic
} else if (formType === 'signup') {
    const name = signUpForm.querySelector('input[type="text"]').value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    const password = signUpForm.querySelector('input[type="password"]').value;
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }
    
    // Add form validation logic here
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields');
        return false; // Prevent form submission
    }

    document.getElementById('submit-button').disabled = true;

    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = 'Please fill in all fields correctly.';
    errorMessage.style.display = 'block';

    signUpForm.classList.add('fade-in');
    signInForm.classList.remove('fade-in');

    fetch('register.php', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect to login page only on successful registration
            swapForms('Log In');
        } else {
            alert(data.error); // Display error message from PHP
        }
    })
    .catch(error => console.error('Error:', error));
}

return false; // Prevent default form submission
}
