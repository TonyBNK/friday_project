import {createSlice} from "@reduxjs/toolkit";


const initialState = {}

const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {

    }
});

export const cardsReducer = cardsSlice.reducer;

export const {} = cardsSlice.actions;