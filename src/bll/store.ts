import {combineReducers} from "redux";
import {loginReducer} from "./reducers/loginReducer";
import {profileReducer} from "./reducers/profileReducer";
import {enterNewPasswordReducer} from "./reducers/enterNewPasswordReducer";
import {registrationReducer} from "./reducers/registrationReducer";
import {passwordRecoveryReducer} from "./reducers/passwordRecoveryReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./reducers/appReducer";
import {packsReducer} from "./reducers/packsReducer";
import {cardsReducer} from "./reducers/cardsReducer";


export const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    enterNewPassword: enterNewPasswordReducer,
    passwordRecovery: passwordRecoveryReducer,
    packs: packsReducer,
    cards: cardsReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

