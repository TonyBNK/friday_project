import axios, {AxiosResponse} from "axios";
import {
    LoginRequestType,
    ProfileResponseType,
    PasswordRecoveryRequestType,
    PasswordRecoveryResponseType,
    RegisterRequestType,
    RegisterResponseType, LogoutResponseType
} from "../types/types";


const axiosInst = axios.create({
    // baseURL: "http://localhost:7542/2.0",
    withCredentials: true
});

export const api = {
    me: async () => {
        const response = await axiosInst
            .post<{}, AxiosResponse<ProfileResponseType>>('http://localhost:7542/2.0/auth/me', {});
        return response.data;
    },
    logIn: async (loginData: LoginRequestType) => {
        const response = await axiosInst
            .post<LoginRequestType, AxiosResponse<ProfileResponseType>>(
                'http://localhost:7542/2.0/auth/login', {
                    ...loginData
                }
            );
        return response.data;
    },
    logOut: async () => {
        const response = await axiosInst
            .delete<LoginRequestType, AxiosResponse<LogoutResponseType>>(
                'http://localhost:7542/2.0/auth/me'
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
