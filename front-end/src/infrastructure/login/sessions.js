import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { getUser } from '../../Slices/Users/actions';

export const getCookie = (key) => Cookies.get(key);

export const getJWTUser = async (jwt) => {
    try {
        const decoded = jwt_decode(jwt);
        console.log(decoded);
        const user = {
            id: decoded.unique_name,
            email: decoded.email,
            role: decoded.role
        };
        console.log(user);
        return user;
    } catch (e){
        return null;
    }
}