import { apiRequest, buildUrl } from "../../infrastructure/api/config"


export const getUser = userId => {
    return apiRequest(buildUrl(`/users/${userId}`), {
        method: 'GET',
        mode: 'cors'
    }, true)
}