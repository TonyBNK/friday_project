import {rootReducer} from "../bll/store";


export type Nullable<T> = T | null;

export type RootStateType = ReturnType<typeof rootReducer>;

export type AppStateType = {
    isLoading: boolean
    error: Nullable<string>
    isInitialized: boolean
}

// Log In types
export type LoginRequestType = {
    email: string
    password: string
    rememberMe: boolean
}

export type LoginStateType = {
    isLogged: boolean
}

export type LoginFormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

// Log Out types
export type LogoutResponseType = {
    info: string
    error: string
}

// Registration types
export type RegisterRequestType = {
    email: string
    password: string
}

export type RegisterResponseType = {
    error?: string
    isRegistered: boolean
}

export type RegisterFormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

// Password recovery types
export type PasswordRecoveryRequestType = {
    email: string
    from: string
    message: string
}

export type PasswordRecoveryResponseType = {
    info: string
    error: string
}

export type PasswordRecoveryFormikErrorType = {
    email?: string
}

// Profile types
export type ProfileResponseType = {
    _id?: string
    email?: string
    name?: string
    avatar?: string
    publicCardPacksCount?: number
    created?: Date
    updated?: Date
    isAdmin?: boolean
    verified?: boolean
    rememberMe?: boolean
    error?: string
}

// Packs types
export type PackType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
}

export type GetPacksRequestType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}

export type GetPacksResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type GetPacksStateType = {
    request: GetPacksRequestType
    response: GetPacksResponseType
}

export type PostPackRequestType = {
    cardsPack: {
        name?: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}

export type PutPackRequestType = {
    cardsPack: {
        _id: string
        name?: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}

// Cards types
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
    more_id?: string
}

export type GetCardsRequestType = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type GetCardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type GetCardsStateType = {
    request: GetCardsRequestType
    response: GetCardsResponseType
}

export type PostCardRequestType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        type?: string
    }
}

export type PutCardRequestType = {
    card: {
        _id: string
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        type?: string
    }
}

// Learn types
export type PutGradeRequestType = {
    grade: number
    card_id: string
}
