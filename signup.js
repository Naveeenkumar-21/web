function validateForm(event) {
    event.preventDefault();
    
    // Get all form inputs
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms').checked;
    
    // Reset error messages
    clearErrors();
    
    // Validate inputs
    let isValid = true;
    
    if (!firstname) {
        showError('firstname-error', 'First name is required');
        isValid = false;
    }
    
    if (!lastname) {
        showError('lastname-error', 'Last name is required');
        isValid = false;
    }
    
    if (!isValidEmail(email)) {
        showError('email-error', 'Please enter a valid email');
        isValid = false;
    }
    
    if (username.length < 4) {
        showError('username-error', 'Username must be at least 4 characters');
        isValid = false;
    }
    
    if (password.length < 6) {
        showError('password-error', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (password !== confirmPassword) {
        showError('confirm-password-error', 'Passwords do not match');
        isValid = false;
    }
    
    if (!terms) {
        showError('terms-error', 'You must accept the terms');
        isValid = false;
    }
    
    if (isValid) {
        // If valid, submit the form
        document.getElementById('signup-form').submit();
        return true;
    }
    
    return false;
}

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.textContent = '');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});