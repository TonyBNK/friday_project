import {RegisterResponseType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: RegisterResponseType = {
    error: '',
    isRegistered: false
}

const registrationSlice = createSlice({
    name: 'registration',
    initialState: initialState,
    reducers: {
        setRegisterError(state, action: PayloadAction<RegisterResponseType>){
            state.error = action.payload.error;
            state.isRegistered = action.payload.isRegistered;
        }
    }
});

export const registrationReducer = registrationSlice.reducer;

export const {setRegisterError} = registrationSlice.actions;
