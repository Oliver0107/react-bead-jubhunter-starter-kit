import { createSlice, configureStore } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            name: '',
            email: '',
            status: '',
            password: '',
            experience: '',
            loginCode: null,
            role: '',
        }
    },
    reducers: {
        login: (state, action) => {
            state.value.loginCode = action.payload.loginCode
            state.value.name = action.payload.name
            state.value.role = action.payload.role
        },
        logout: (state) => {
            state.value.name = ''
            state.value.loginCode = null
            state.value.role = ''
        }
    }
})



const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

export const { login, logout } = userSlice.actions
export default store
