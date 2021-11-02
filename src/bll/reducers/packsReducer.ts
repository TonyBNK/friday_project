import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    GetPacksRequestType,
    GetPacksResponseType,
    GetPacksStateType
} from "../../types/types";


const initialState: GetPacksStateType = {
    request: {
        packName: undefined,
        min: undefined,
        max: undefined,
        sortPacks: '0updated',
        page: 1,
        pageCount: 5,
        user_id: undefined,
    },
    response: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 5,
    }
}

const packsSlice = createSlice({
    name: 'packs',
    initialState: initialState,
    reducers: {
        setRequestParams(state, action: PayloadAction<GetPacksRequestType>){
            state.request = action.payload;
        },
        setCardPacks(state, action: PayloadAction<GetPacksResponseType>) {
            state.response = action.payload;
        }
    }
});

export const packsReducer = packsSlice.reducer;

export const {setCardPacks, setRequestParams} = packsSlice.actions;
