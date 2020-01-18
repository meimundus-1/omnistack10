import publicIp from 'public-ip'

import axios from 'axios'

async function getBaseUrl() {
    return await `http://${publicIp.v4()}:3333`
}

const api = axios.create({
    baseURL: 'http://192.168.0.54:3333',
})

export default api
