import {createSlice} from "@reduxjs/toolkit";


const initialState = {}

const packsSlice = createSlice({
    name: 'packs',
    initialState: initialState,
    reducers: {

    }
});

export const packsReducer = packsSlice.reducer;

export const {} = packsSlice.actions;
