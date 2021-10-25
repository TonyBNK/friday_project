import {LoginResponseType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: LoginResponseType = {
    _id: '',
    avatar: '',
    name: '',
    created: new Date(),
    email: '',
    error: '',
    isAdmin: false,
    publicCardPacksCount: 0,
    rememberMe: false,
    updated: new Date(),
    verified: false
};

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setLogged(state, action: PayloadAction<LoginResponseType>) {
            state = action.payload
        }
    }
})

export const loginReducer = loginSlice.reducer;

export const {setLogged} = loginSlice.actions;
