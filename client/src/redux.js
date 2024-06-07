import { createSlice, configureStore } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            id: null,
            name: '',
            email: '',
            loginCode: null,
            role: '',
        }
    },
    reducers: {
        login: (state, action) => {
            state.value.id = action.payload.id
            state.value.loginCode = action.payload.loginCode
            state.value.name = action.payload.name
            state.value.role = action.payload.role
            state.value.email = action.payload.email

        },
        logout: (state) => {
            state.value.id = null
            state.value.name = ''
            state.value.loginCode = null
            state.value.role = ''
            state.value.email = ''
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
