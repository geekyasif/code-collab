import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IUser {
    [key: string] : any
}


interface IAuthState {
    authToken: string | null,
    user: IUser
}

const initialState: IAuthState = {
    authToken: null,
    user: {}
}


export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthToken : (state, action: PayloadAction<string>) => {
            state.authToken = action.payload
        },
        removeAuthtoken: (state) => {
            state.authToken = null
        },
        setUser: (state, action: PayloadAction<object>) => {
            state.user = action.payload
        }
    }
})


export const {setAuthToken, removeAuthtoken, setUser} = AuthSlice.actions
export default AuthSlice.reducer