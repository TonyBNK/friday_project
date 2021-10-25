import {Dispatch} from "redux";
import {setLogged} from "../reducers/loginReducer";
import {api} from "../../api/api";
import {LoginRequestType, RegisterRequestType} from "../../types/types";
import {setRegisterError} from "../reducers/registrationReducer";


export const logIn = (loginData: LoginRequestType) => async (dispatch: Dispatch) => {
    try {
        const response = await api.logIn(loginData);
        response && dispatch(setLogged({data: response.data, isLogged: true}));
    } catch (e: any) { // TODO: delete any type
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error);
        console.log('Error: ', {...e});
    }
}

export const register = (registrationData: RegisterRequestType) => async (dispatch: Dispatch) => {
    try {
        const response = await api.register(registrationData);
        if (response) {
            !response.error
                ? dispatch(setRegisterError({
                    isRegistered: true,
                    error: response.error
                }))
                : dispatch(setRegisterError({
                    isRegistered: false,
                    error: response.error
                }));
        }
    } catch (e: any) { // TODO: delete any type
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error);
        console.log('Error: ', {...e});
    }
}
