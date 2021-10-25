import {combineReducers} from "redux";
import {loginReducer} from "./reducers/loginReducer";
import {profileReducer} from "./reducers/profileReducer";
import {enterNewPasswordReducer} from "./reducers/enterNewPasswordReducer";
import {registrationReducer} from "./reducers/registrationReducer";
import {passwordRecoveryReducer} from "./reducers/passwordRecoveryReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";


export const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    enterNewPassword: enterNewPasswordReducer,
    passwordRecovery: passwordRecoveryReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

