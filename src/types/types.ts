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
