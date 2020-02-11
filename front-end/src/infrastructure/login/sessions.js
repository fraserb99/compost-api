import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const getCookie = (key) => Cookies.get(key);

export const getJWTUser = (jwt) => {
    try {
        const decoded = jwt_decode(jwt);
        return decoded.data;
    } catch (e){
        return null;
    }
}