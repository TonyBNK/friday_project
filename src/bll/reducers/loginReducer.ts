import {LoginStateType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: LoginStateType = {
        isLogged: false
};

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setLogged(state, action: PayloadAction<LoginStateType>) {
            state.isLogged = action.payload.isLogged;
        }
    }
})

export const loginReducer = loginSlice.reducer;

export const {setLogged} = loginSlice.actions;
