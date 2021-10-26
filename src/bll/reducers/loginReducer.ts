import {LoginResponseType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: LoginResponseType = {
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
};

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setLogged(state, action: PayloadAction<LoginResponseType>) {
            state._id = action.payload._id;
            state.avatar = action.payload.avatar;
            state.name = action.payload.name;
        }
    }
})

export const loginReducer = loginSlice.reducer;

export const {setLogged} = loginSlice.actions;
