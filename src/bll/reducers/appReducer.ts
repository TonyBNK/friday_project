import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppStateType, Nullable} from "../../types/types";


const initialState: AppStateType = {
    isLoading: false,
    error: null,
    isInitialized: false
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setLoading(state, action: PayloadAction<{isLoading: boolean}>){
            state.isLoading = action.payload.isLoading;
        },
        setAppError(state, action: PayloadAction<{error: Nullable<string>}>){
            state.error = action.payload.error;
        },
        setAppInitialized(state, action: PayloadAction<{isInitialized: boolean}>){
            state.isInitialized = action.payload.isInitialized;
        }
    }
});

export const appReducer = appSlice.reducer;

export const {setLoading, setAppError, setAppInitialized} = appSlice.actions;
