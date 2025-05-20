// Profile Picture Upload
const profilePic = document.getElementById('profile-pic');
const profilePicUpload = document.getElementById('profile-pic-upload');

profilePicUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePic.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Form Validation
function validateForm(event) {
    event.preventDefault();
    let isValid = true;

    // Reset all error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });

    // Validate Full Name
    const fullname = document.getElementById('fullname');
    if (fullname.value.trim().length < 2) {
        showError('fullname-error', 'Please enter a valid full name (minimum 2 characters)');
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Phone
    const phone = document.getElementById('phone');
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    if (!phoneRegex.test(phone.value)) {
        showError('phone-error', 'Please enter a valid phone number with country code');
        isValid = false;
    }

    // Validate Date of Birth
    const dob = document.getElementById('dob');
    const dobDate = new Date(dob.value);
    const today = new Date();
    const minAge = 13;
    const maxAge = 120;
    
    if (!dob.value) {
        showError('dob-error', 'Please enter your date of birth');
        isValid = false;
    } else {
        const age = today.getFullYear() - dobDate.getFullYear();
        if (age < minAge || age > maxAge) {
            showError('dob-error', `Age must be between ${minAge} and ${maxAge} years`);
            isValid = false;
        }
    }

    // Validate Gender
    const gender = document.getElementById('gender');
    if (!gender.value) {
        showError('gender-error', 'Please select your gender');
        isValid = false;
    }

    // Validate Address
    const address = document.getElementById('address');
    if (address.value.trim().length < 10) {
        showError('address-error', 'Please enter a valid address (minimum 10 characters)');
        isValid = false;
    }

    // Validate Country
    const country = document.getElementById('country');
    if (country.value.trim().length < 2) {
        showError('country-error', 'Please enter a valid country name');
        isValid = false;
    }

    // Validate Social Media URLs (if provided)
    const urlFields = ['linkedin', 'github', 'twitter'];
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    urlFields.forEach(field => {
        const input = document.getElementById(field);
        if (input.value && !urlRegex.test(input.value)) {
            showError(`${field}-error`, 'Please enter a valid URL');
            isValid = false;
        }
    });

    // Validate Current Password
    const currentPassword = document.getElementById('current-password');
    if (currentPassword.value.length < 8) {
        showError('current-password-error', 'Password must be at least 8 characters long');
        isValid = false;
    }

    // Validate New Password (if provided)
    const newPassword = document.getElementById('new-password');
    if (newPassword.value) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword.value)) {
            showError('new-password-error', 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character');
            isValid = false;
        }
    }

    // Validate Bio (if provided)
    const bio = document.getElementById('bio');
    if (bio.value && bio.value.trim().length < 10) {
        showError('bio-error', 'Bio should be at least 10 characters long');
        isValid = false;
    }

    if (isValid) {
        // Here you would typically submit the form to a server
        alert('Profile updated successfully!');
    }

    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Cancel Button Handler
document.querySelector('.cancel-btn').addEventListener('click', function() {
    if (confirm('Are you sure you want to discard your changes?')) {
        window.location.href = 'login.html'; // Redirect to login page
    }
});

// Auto-format phone number as user types
document.getElementById('phone').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
}); 