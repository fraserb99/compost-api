import { apiRequest, buildUrl } from "../../infrastructure/api/config"

export const getDevices = () => {
    return apiRequest(buildUrl('/devices'), {
        method: 'GET',
        mode: 'cors'
    }, false)
}

export const getDevice = (deviceId) => {
    return apiRequest(buildUrl(`/devices/${deviceId}`), {
        method: 'GET',
        mode: 'cors'
    }, true)
}

export const getDataforDevice = (deviceId) => {
    return apiRequest(buildUrl(`/compost/${deviceId}`), {
        method: 'GET',
        mode: 'cors'
    }, false)
}