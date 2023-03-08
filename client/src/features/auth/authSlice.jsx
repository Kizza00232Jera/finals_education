import { createSlice } from '@reduxjs/toolkit'

//creating auth slice
const authSlice = createSlice({
    //naming slice auth
    //initial state is object that is gonna receive token object
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token