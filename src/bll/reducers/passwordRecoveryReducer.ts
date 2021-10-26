import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PasswordRecoveryResponseType} from "../../types/types";


const initialState: PasswordRecoveryResponseType = {
    error: '',
    info: ''
}

const pasRecSlice = createSlice({
    name: 'passwordRecovery',
    initialState: initialState,
    reducers: {
        setPasRecover(state, action: PayloadAction<PasswordRecoveryResponseType>){
            state.error = action.payload.error
            state.info = action.payload.info
        }
    }
})

export const passwordRecoveryReducer = pasRecSlice.reducer;

export const {setPasRecover} = pasRecSlice.actions;
