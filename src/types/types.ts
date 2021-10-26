import {rootReducer} from "../bll/store";


export type Nullable<T> = T | null;

export type RootStateType = ReturnType<typeof rootReducer>;

export type AppStateType = {
    isLoading: boolean
    error: Nullable<string>
    isInitialized: boolean
}

// Login types
export type LoginRequestType = {
    email: string
    password: string
    rememberMe: boolean
}

export type LoginResponseType = {
    data: {
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
        error?: string;
    },
    isLogged: boolean
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

export type RegisterErrorType = {
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
