import axios, {AxiosResponse} from "axios";
import {
    LoginRequestType,
    LoginResponseType,
    PasswordRecoveryRequestType,
    PasswordRecoveryResponseType,
    RegisterRequestType,
    RegisterResponseType
} from "../types/types";


const axiosInst = axios.create({
    baseURL: "http://localhost:7542/2.0",
    withCredentials: true
});

export const api = {
    logIn: async (loginData: LoginRequestType) => {
        try {
            const response = await axiosInst
                .post<LoginRequestType, AxiosResponse<LoginResponseType>>(
                    '/auth/login', {
                        ...loginData
                    }
                );
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },
    register: async (registerData: RegisterRequestType) => {
        try {
            const response = await axiosInst
                .post<RegisterRequestType, AxiosResponse<RegisterResponseType>>('/auth/register', {
                    ...registerData
                });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },
    recoverPassword: async (email: string) => {
        try {
            const response = await axiosInst
                .post<PasswordRecoveryRequestType, AxiosResponse<PasswordRecoveryResponseType>>('/auth/forgot', {
                    email,
                    from: 'test-front-admin <borisenk-anton@yandex.ru>',
                    message: `<div style="background-color: lime; padding: 15px">
password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a>
</div>`
                });
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}
