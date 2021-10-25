import axios, {AxiosResponse} from "axios";
import {
    LoginRequestType,
    LoginResponseType,
    RegisterRequestType, RegisterResponseType
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
    }
}
