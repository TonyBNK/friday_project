import {combineReducers} from "redux";
import {loginReducer} from "./reducers/loginReducer";
import {profileReducer} from "./reducers/profileReducer";
import {enterNewPasswordReducer} from "./reducers/enterNewPasswordReducer";
import {registrationReducer} from "./reducers/registrationReducer";
import {passwordRecoveryReducer} from "./reducers/passwordRecoveryReducer";
import thunkMiddleWare from 'redux-thunk';
import {configureStore} from "@reduxjs/toolkit";


export const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    enterNewPassword: enterNewPasswordReducer,
    passwordRecovery: passwordRecoveryReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleWare)
});

