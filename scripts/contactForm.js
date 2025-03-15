// Selecting the form by its unique ID
const form = document.getElementById('contact-form');

// Guard clause: Only run the script if the form exists
if (form) {
    // Now that the form exists, select the other elements
    const fullName = document.getElementById('name-wrapper').children;
    const email = document.getElementById('email-wrapper').children;
    const message = document.getElementById('message-wrapper').children;

    // Success Confirmation Modal
    const successModal = document.getElementById('successModal');
    const successModalCloseBtn = document.getElementById('successModalCloseBtn');

    function validateInput(item) {
        if (item[1].value.length === 0) {
            item[1].classList.add('incorrect');
            item[2].classList.remove('none');
        } else {
            item[1].classList.remove('incorrect');
            item[2].classList.add('none');
        }
    }

    function validateEmail(item) {
        const regexEmail = new RegExp("^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
        const emailValid = regexEmail.test(item[1].value);

        if (item[1].value.length === 0 || !emailValid) {
            item[1].classList.add('incorrect');
            item[2].classList.remove('none');
        } else {
            item[1].classList.remove('incorrect');
            item[2].classList.add('none');
        }
    }

    function validateMessage(item) {
        if (item[1].value.length < 80) {
            item[1].classList.add('incorrect');
            item[2].classList.remove('none');
        } else {
            item[1].classList.remove('incorrect');
            item[2].classList.add('none');
        }
    }

    function validate() {
        validateInput(fullName);
        validateEmail(email);
        validateMessage(message);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        validate();

        // Check if all fields are valid before submitting
        if (
            !fullName[1].classList.contains('incorrect') &&
            !email[1].classList.contains('incorrect') &&
            !message[1].classList.contains('incorrect')
        ) {
            // Submit the form data manually
            fetch(form.action, {
                method: form.method,
                body: new URLSearchParams(new FormData(form)),
            })
                .then((response) => {
                    // Show success message
                    successModal.style.display = 'block';
                    form.reset(); // Clear the form
                    setTimeout(function () {
                        successModal.style.display = 'none';
                    }, 3000);
                })
                .catch((error) => {
                    // Handle errors
                    alert('Error submitting the form. Please try again later.');
                });
        }
    });

    successModalCloseBtn.addEventListener('click', function () {
        successModal.style.display = 'none';
    });
}