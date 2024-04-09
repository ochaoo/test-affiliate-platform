import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { userLogin, userRegistration, userLogout, userAllowResetPassword, userResetPassword } from '../services/authService'
import axios from 'axios'

export const login = createAsyncThunk('users/userLogin', async (userData, { rejectWithValue, dispatch }) => {
    try {
        const { email, password } = userData
        const response = await userLogin(email, password)

        if (!response.statusText === 'OK') {
            throw new Error('Login Error!')
        }

        console.log(response.data)

        localStorage.setItem('token', response.data.accessToken)

        dispatch(setAuth(true))
        dispatch(setUser(response.data.user))
        dispatch(setStatus('resolved'))
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const registration = createAsyncThunk('users/userRegistration', async (userData, { rejectWithValue, dispatch }) => {
    try {
        const { email, password, role } = userData

        const response = await userRegistration(email, password, role)

        if (!response.statusText === 'OK') {
            throw new Error('Registration error.')
        }

        localStorage.setItem('token', response.data.accessToken)

        dispatch(setAuth(true))
        dispatch(setUser(response.data.user))
        dispatch(setStatus('resolved'))
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const allowResetPassword = createAsyncThunk(
    'users/allowResetPassword',
    async (userData, { rejectWithValue, dispatch }) => {
        try {
            const response = await userAllowResetPassword(userData)

            if (response.data.status) {
                dispatch(setStatus('resolved'))
                return true
            }

            dispatch(setStatus('rejected'))
            return false
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const resetPassword = createAsyncThunk('users/resetPassword', async (userData, { rejectWithValue, dispatch }) => {
    try {
        const { email, password } = userData
        const response = await userResetPassword(email, password)

        if (!response.statusText === 'OK') {
            throw new Error('Registration error.')
        }

        console.log(response)
        localStorage.setItem('token', response.data.accessToken)

        dispatch(setAuth(true))
        dispatch(setUser(response.data.user))
        dispatch(setStatus('resolved'))
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const logout = createAsyncThunk('users/userLogout', async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await userLogout()

        if (!response.statusText === 'OK') {
            throw new Error('Logout error.')
        }

        localStorage.removeItem('token')

        dispatch(setAuth(false))
        dispatch(setUser({}))
        dispatch(setStatus('resolved'))
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const checkAuth = createAsyncThunk('users/checkAuth', async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/refresh`, { withCredentials: true })

        if (!response.statusText === 'OK') {
            dispatch(setAuth(false))
            dispatch(setUser({}))
            dispatch(setStatus('resolved'))
        }

        localStorage.setItem('token', response.data.accessToken)

        dispatch(setAuth(true))
        dispatch(setUser(response.data.user))
        dispatch(setStatus('resolved'))
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: {},
        isAuth: false,
        error: null,
        status: ''
    },
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload
        },
        setUser(state, action) {
            state.currentUser = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(login.rejected, (state, action) => setError(state, action))
            .addCase(registration.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(registration.rejected, (state, action) => setError(state, action))
            .addCase(logout.pending, (state, action) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(logout.rejected, (state, action) => setError(state, action))
            .addCase(checkAuth.rejected, (state, action) => setError(state, action))
    }
})

export const { setAuth, setUser, setStatus } = usersSlice.actions

export default usersSlice.reducer
