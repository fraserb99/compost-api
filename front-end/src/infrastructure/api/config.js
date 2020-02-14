import { getCookie } from '../login/sessions';

export const API_URL = process.env.NODE_ENV === 'development' ? 'https://localhost:44341' : 'https://compost-api.azurewebsites.net';

export const buildUrl = (segment) => API_URL + segment;

export const apiRequest = (url, opts, authorise) => {
    return fetch(url, {
            ...opts,
            headers: {...opts.headers, 'Authorization' : `Bearer ${getCookie('compost-jwt')}`}
        })
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error();
            }

            return response.json();
        })
}