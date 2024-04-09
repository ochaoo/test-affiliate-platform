import api from '../http'

export const userLogin = async (email, password) => {
    return api.post('/login', { email, password })
}

export const userRegistration = async (email, password, role) => {
    return api.post('/registration', { email, password, role })
}

export const userAllowResetPassword = async (email) => {
    return api.post('/allowResetPassword', { email })
}

export const userResetPassword = async (email, password) => {
    return api.post('/resetPassword', { email, password })
}

export const userLogout = async () => {
    return api.post('/logout')
}
