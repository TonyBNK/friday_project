import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./reducers/loginReducer";
import {profileReducer} from "./reducers/profileReducer";
import {error404Reducer} from "./reducers/error404Reducer";
import {enterNewPasswordReducer} from "./reducers/enterNewPasswordReducer";
import {registrationReducer} from "./reducers/registrationReducer";
import {passwordRecoveryReducer} from "./reducers/passwordRecoveryReducer";
import thunkMiddleWare, {ThunkAction} from 'redux-thunk';


const rootReducer = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    error404: error404Reducer,
    enterNewPassword: enterNewPasswordReducer,
    passwordRecovery: passwordRecoveryReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export type RootStateType = ReturnType<typeof rootReducer>;

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, any> // TODO: Add RootActionsType