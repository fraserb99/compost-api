import React from 'react';
import { buildUrl } from '../../infrastructure/api/config';

export const logIn = (values) => {
    return fetch(buildUrl('/login'), {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
        "email": values.username,
        'password': values.password
        }),
        headers: {'Content-Type':'application/json; charset=UTF-8'},
    });
}

export const createAccount = (values) => {
    return fetch(buildUrl('/users'), {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            'password': values.password,
            'email': values.username
        }),
        headers: {'Content-Type':'application/json; charset=UTF-8'},
    });
}