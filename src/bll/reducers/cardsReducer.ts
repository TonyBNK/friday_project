import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    CardType,
    GetCardsRequestType, GetCardsResponseType,
    GetCardsStateType
} from "../../types/types";


const initialState: GetCardsStateType = {
    request: {
        cardsPack_id: '1',
        cardAnswer: undefined,
        cardQuestion: undefined,
        min: undefined,
        max: undefined,
        sortCards: undefined,
        page: undefined,
        pageCount: undefined,
    },
    response: {
        cards: [
            {
                answer: "no answer",
                question: "no question",
                cardsPack_id: "5eb6a2f72f849402d46c6ac4",
                grade: 4.987525071790364,
                rating: 0,
                shots: 1,
                type: "card",
                user_id: "142151531535151",
                created: "2020-05-13T11:05:44.867Z",
                updated: "2020-05-13T11:05:44.867Z",
                __v: 0,
                _id: "5ebbd48876810f1ad0e7ece3"
            }
        ],
        cardsTotalCount: 3,
        maxGrade: 4.987525071790364,
        minGrade: 2.0100984354076568,
        page: 1,
        pageCount: 4,
        packUserId: "5eecf82a3ed8f700042f1186"
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
