import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    PackType,
    GetPacksRequestType,
    GetPacksStateType, GetPacksResponseType
} from "../../types/types";


const initialState: GetPacksStateType = {
    request: {
        packName: undefined,
        min: undefined,
        max: undefined,
        sortPacks: undefined,
        page: 1,
        pageCount: 5,
        user_id: undefined,
    },
    response: {
        cardPacks: [
            {
                _id: "5eb6cef840b7bf1cf0d8122d",
                user_id: "5eb543f6bea3ad21480f1ee7",
                name: "no Name",
                path: "/def", // папка
                cardsCount: 25,
                grade: 0, // средняя оценка карточек
                shots: 0, // количество попыток
                rating: 0, // лайки
                type: "pack", // ещё будет "folder" (папка)
                created: "2020-05-09T15:40:40.339Z",
                updated: "2020-05-09T15:40:40.339Z",
                __v: 0
            },
        ],
        cardPacksTotalCount: 14, // количество колод
        maxCardsCount: 4,
        minCardsCount: 0,
        page: 1, // выбранная страница
        pageCount: 5, // количество элементов на странице
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
