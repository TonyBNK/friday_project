import {Dispatch} from "redux";
import {setLogged} from "../reducers/loginReducer";
import {authAPI, cardsAPI, packsAPI} from "../../api/api";
import {
    CardType,
    LoginRequestType, PostCardRequestType,
    PostPackRequestType, PutCardRequestType,
    PutPackRequestType,
    RegisterRequestType
} from "../../types/types";
import {setRegisterError} from "../reducers/registrationReducer";
import {setPasRecover} from "../reducers/passwordRecoveryReducer";
import {setAppInitialized, setLoading} from "../reducers/appReducer";
import {setProfileData} from "../reducers/profileReducer";
import {setCardPacks} from "../reducers/packsReducer";
import {setCards} from "../reducers/cardsReducer";


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
        response && dispatch(setCardPacks(response));
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

export const addNewPack = (cardsPack: PostPackRequestType) => async (dispatch: Dispatch<any>) => {
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

export const updatePack = (cardsPack: PutPackRequestType) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setLoading({isLoading: true}));
        await packsAPI.updatePack(cardsPack);
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

export const getCards = (cardsPackId: string) => async (dispatch: Dispatch<any>, getState: Function) => {
    try {
        dispatch(setLoading({isLoading: true}));
        const response = await cardsAPI.getCards({...getState().packs.request, cardsPack_id: cardsPackId});
        response && dispatch(setCards(response));
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

export const addNewCard = (card: PostCardRequestType) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setLoading({isLoading: true}));
        await cardsAPI.addNewCard(card);
        dispatch(getCards(card.card.cardsPack_id));
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

export const deleteCard = (cardId: string, cardsPackId: string) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setLoading({isLoading: true}));
        await cardsAPI.deleteCard(cardId);
        dispatch(getCards(cardsPackId));
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

export const updateCard = (card: PutCardRequestType) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setLoading({isLoading: true}));
        await cardsAPI.updateCard(card);
        dispatch(getCards(card.card.cardsPack_id));
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
