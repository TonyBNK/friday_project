import {Dispatch} from "redux";
import {setLogged} from "../reducers/loginReducer";
import {api} from "../../api/api";
import {LoginRequestType, RegisterRequestType} from "../../types/types";
import {setRegisterError} from "../reducers/registrationReducer";
import {setPasRecover} from "../reducers/passwordRecoveryReducer";
import {setAppInitialized, setLoading} from "../reducers/appReducer";
import {setProfileData} from "../reducers/profileReducer";


export const logIn = (loginData: LoginRequestType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading({isLoading: true}));
        const response = await api.logIn(loginData);
        dispatch(setProfileData(response));
        dispatch(setLogged({isLogged: true}));
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error);
        console.log('Error: ', {...e});
    } finally {
        dispatch(setLoading({isLoading: false}));
    }
}

export const logOut = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading({isLoading: true}));
        await api.logOut();
        dispatch(setLogged({isLogged: false}));
    } catch (e: any) {
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
    } catch (e: any) {
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
    } catch (e: any) {
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
        dispatch(setLoading({isLoading: true}));
        const response = await api.me();
        dispatch(setProfileData(response));
        dispatch(setLogged({isLogged: true}));
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error);
        console.log('Error: ', {...e});
    } finally {
        dispatch(setLoading({isLoading: false}));
        dispatch(setAppInitialized({isInitialized: true}));
    }
}
