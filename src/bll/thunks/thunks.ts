import {Dispatch} from "redux";
import {setLogged} from "../reducers/loginReducer";
import {authAPI, packsAPI} from "../../api/api";
import {
    GetCardsPackStateType,
    LoginRequestType, PostCardsPackRequestType,
    RegisterRequestType
} from "../../types/types";
import {setRegisterError} from "../reducers/registrationReducer";
import {setPasRecover} from "../reducers/passwordRecoveryReducer";
import {setAppInitialized, setLoading} from "../reducers/appReducer";
import {setProfileData} from "../reducers/profileReducer";
import {setCardPacks} from "../reducers/packsReducer";


export const logIn = (loginData: LoginRequestType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading({isLoading: true}));
        const response = await authAPI.logIn(loginData);
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
        await authAPI.logOut();
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
        const response = await authAPI.register(registrationData);
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
        const response = await authAPI.recoverPassword(email);
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
        const response = await authAPI.me();
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

export const getPacks = () => async (dispatch: Dispatch, getState: Function) => {
    try {
        dispatch(setLoading({isLoading: true}));
        const response = await packsAPI.getPacks(getState().packs.request);
        response && dispatch(setCardPacks(response.cardPacks));
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

export const addNewPack = (cardsPack: PostCardsPackRequestType) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setLoading({isLoading: true}));
        await packsAPI.addNewPack(cardsPack);
        dispatch(getPacks());
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

export const deletePack = (cardsPackId: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setLoading({isLoading: true}));
        await packsAPI.deletePack(cardsPackId);
        dispatch(getPacks());
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
