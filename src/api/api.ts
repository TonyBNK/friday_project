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
    // baseURL: "http://localhost:7542/2.0",
    withCredentials: true
});

export const api = {
    me: async () => {
        try {
            const response = await axiosInst
                .post<{}, AxiosResponse<LoginResponseType>>('http://localhost:7542/2.0/auth/me', {});
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },
    logIn: async (loginData: LoginRequestType) => {
        const response = await axiosInst
            .post<LoginRequestType, AxiosResponse<LoginResponseType>>(
                'http://localhost:7542/2.0/auth/login', {
                    ...loginData
                }
            );
        return response.data;
    },
    register: async (registerData: RegisterRequestType) => {
        const response = await axiosInst
            .post<RegisterRequestType, AxiosResponse<RegisterResponseType>>('http://localhost:7542/2.0/auth/register', {
                ...registerData
            });
        return response.data;
    },
    recoverPassword: async (email: string) => {
        const response = await axiosInst
            .post<PasswordRecoveryRequestType, AxiosResponse<PasswordRecoveryResponseType>>('https://neko-back.herokuapp.com/2.0/auth/forgot', {
                email,
                from: 'test-front-admin <borisenk-anton@yandex.ru>',
                message: `<div style="background-color: lime; padding: 15px">
password recovery link: <a href='http://localhost:3000/friday_project#/password_recovery/$token$'>link</a>
</div>`
            });
        return response.data;
    }
}
