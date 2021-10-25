import {LoginResponseType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: LoginResponseType = {
    data: {
        _id: '',
        avatar: '',
        name: '',
        created: undefined,
        email: '',
        error: '',
        isAdmin: false,
        publicCardPacksCount: 0,
        rememberMe: false,
        updated: undefined,
        verified: false
    },
    isLogged: false
};

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setLogged(state, action: PayloadAction<LoginResponseType>) {
            state.data = action.payload.data
            state.isLogged = action.payload.isLogged
        }
    }
})

export const loginReducer = loginSlice.reducer;

export const {setLogged} = loginSlice.actions;
