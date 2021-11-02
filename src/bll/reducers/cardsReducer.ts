import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    GetCardsRequestType,
    GetCardsResponseType,
    GetCardsStateType
} from "../../types/types";


const initialState: GetCardsStateType = {
    request: {
        cardsPack_id: '',
        cardAnswer: undefined,
        cardQuestion: undefined,
        min: undefined,
        max: undefined,
        sortCards: '0grade',
        page: 1,
        pageCount: 5,
    },
    response: {
        cards: [],
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        page: 1,
        pageCount: 5,
        packUserId: ""
    }
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        setRequestParams(state, action: PayloadAction<GetCardsRequestType>){
            state.request = action.payload;
        },
        setCards(state, action: PayloadAction<GetCardsResponseType>) {
            state.response = action.payload;
        },
    }
});

export const cardsReducer = cardsSlice.reducer;

export const {setCards, setRequestParams} = cardsSlice.actions;
