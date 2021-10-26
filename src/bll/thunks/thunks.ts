import {Dispatch} from "redux";
import {setLogged} from "../reducers/loginReducer";
import {api} from "../../api/api";
import {LoginRequestType, RegisterRequestType} from "../../types/types";
import {setRegisterError} from "../reducers/registrationReducer";
import {setPasRecover} from "../reducers/passwordRecoveryReducer";
import {setAppInitialized, setLoading} from "../reducers/appReducer";


export const logIn = (loginData: LoginRequestType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading({isLoading: true}));
        const response = await api.logIn(loginData);
        response && dispatch(setLogged(response));
    } catch (e: any) { // TODO: delete any type
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error);
        console.log('Error: ', {...e});
    } finally {
        dispatch(setLoading({isLoading: false}));
    }
}

export const register = (registrationData: RegisterRequestType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading({isLoading: true}));
        const response = await api.register(registrationData);
        response && dispatch(setRegisterError({
            isRegistered: true,
            error: response.error
        }));
    } catch (e: any) { // TODO: delete any type
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error);
        console.log('Error: ', {...e});
    } finally {
        dispatch(setLoading({isLoading: false}));
    }
}

export const recoverPassword = (email: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading({isLoading: true}));
        const response = await api.recoverPassword(email);
        response && dispatch(setPasRecover({...response}));
    } catch (e: any) { // TODO: delete any type
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error);
        console.log('Error: ', {...e});
    } finally {
        dispatch(setLoading({isLoading: false}));
    }
}

export const setAppInitialize = () => async (dispatch: Dispatch) => {
    try {
        const response = await api.me();
        dispatch(setLoading({isLoading: false}));
        response && dispatch(setLogged({data: response.data, isLogged: true}));
    } catch (e) {
        console.log(e);
    } finally {
        dispatch(setAppInitialized({isInitialized: true}));
    }
}
