import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppStateType} from "../../types/types";


const initialState: AppStateType = {
    isLoading: false
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setLoading(state, action: PayloadAction<AppStateType>){
            state.isLoading = action.payload.isLoading
        }
    }
});

export const appReducer = appSlice.reducer;

export const {setLoading} = appSlice.actions;
