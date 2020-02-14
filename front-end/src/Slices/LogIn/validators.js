import React from 'react';

export const validateLogin = (values) => {
    const errors = {};

    validateUsername(values, errors);

    validatePassword(values, errors);
    return errors;
}

export const validateNewAccount = (values) => {
    const errors = validateLogin(values);

    validateEmail(values, errors);

    return errors;
}

const validateUsername = (values, errors) => {
    if (!values.username) {
        errors.username = 'Please enter a username';
    }

    if (values.username.length < 6) {
        errors.username = 'Username must be 6 characters or more'
    }
}

const validatePassword = (values, errors) => {
    if (!values.password) {
        errors.password = 'Please enter a password';
    }
}

const validateEmail = (values, errors) => {
    if (!values.email) {
        errors.email = 'Please enter an email address';
    }

    const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    if (!re.test(values.email)) {
        errors.email = 'Invalid email address'
    }
}