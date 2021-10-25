import {Dispatch} from "redux";
import {setLogged} from "../reducers/loginReducer";
import {api} from "../../api/api";
import {LoginRequestType} from "../../types/types";


export const logIn = (loginData: LoginRequestType) => async (dispatch: Dispatch) => {
    try {
        const response = await api.logIn(loginData);
        dispatch(setLogged({...response}));
    } catch (e: any) { // TODO: delete any type
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log(error);
        console.log('Error: ', {...e});
    }
}
