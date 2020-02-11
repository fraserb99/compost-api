import { apiRequest, buildUrl } from "../../infrastructure/api/config"

export const getDevices = () => {
    return apiRequest(buildUrl('/devices'), {
        method: 'GET',
        mode: 'cors'
    }, false)
}

export const getDataforDevice = (deviceId) => {
    return apiRequest(buildUrl(`/compost/${deviceId}`), {
        method: 'GET',
        mode: 'cors'
    }, false)
}