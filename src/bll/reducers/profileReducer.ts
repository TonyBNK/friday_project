import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {}
})

export const profileReducer = profileSlice.reducer;

export const {} = profileSlice.actions;
