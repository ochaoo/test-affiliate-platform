import axios from 'axios'

const api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL,
    httpsAgent: {
        rejectUnauthorized: false
    }
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status == 401 && error.config && !error.config.isRetry) {
            originalRequest.isRetry = true
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/refresh`, { withCredentials: true })
                localStorage.setItem('token', response.data.accessToken)
                return api.request(originalRequest)
            } catch (e) {
                console.log('NOT AUTHORIZED')
            }
        }
        throw error
    }
)

export default api
