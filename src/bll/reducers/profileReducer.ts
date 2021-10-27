import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProfileResponseType} from "../../types/types";

const initialState: ProfileResponseType = {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: undefined,
        updated: undefined,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: ''
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setProfileData(state, action: PayloadAction<ProfileResponseType>) {
            return action.payload;
        }
    }
});

export const profileReducer = profileSlice.reducer;

export const {setProfileData} = profileSlice.actions;
