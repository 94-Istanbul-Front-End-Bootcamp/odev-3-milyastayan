const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');

const form = document.querySelector('#form');


const checkUsername = () => {

    let valid = false;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'lütfen bu alanı doldurun');
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'lütfen bu alanı doldurun');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Geçersiz e-posta')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;

    const min = 3;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'lütfen bu alanı doldurun');
    } else if (!isBetween(password.length, min)) {
        showError(passwordEl, 'şifreniz en az 8 karakter olmalı');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};


const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min) => length < min ? false : true;


const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid;

    
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));