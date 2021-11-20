import axios, {AxiosResponse} from "axios";
import {
    GetCardsRequestType,
    GetCardsResponseType,
    GetPacksRequestType,
    GetPacksResponseType,
    LoginRequestType,
    LogoutResponseType,
    PasswordRecoveryRequestType,
    PasswordRecoveryResponseType,
    PostCardRequestType,
    PostPackRequestType,
    ProfileResponseType,
    PutCardRequestType,
    PutGradeRequestType,
    PutPackRequestType,
    RegisterRequestType,
    RegisterResponseType
} from "../types/types";


const axiosInst = axios.create({
    // baseURL: "http://localhost:7542/2.0/",
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
});

export const authAPI = {
    me: async () => {
        const response = await axiosInst
            .post<{}, AxiosResponse<ProfileResponseType>>('auth/me', {});
        return response.data;
    },
    logIn: async (loginData: LoginRequestType) => {
        const response = await axiosInst
            .post<LoginRequestType, AxiosResponse<ProfileResponseType>>(
                'auth/login', {
                    ...loginData
                }
            );
        return response.data;
    },
    logOut: async () => {
        const response = await axiosInst
            .delete<LoginRequestType, AxiosResponse<LogoutResponseType>>(
                'auth/me'
            );
        return response.data;
    },
    register: async (registerData: RegisterRequestType) => {
        const response = await axiosInst
            .post<RegisterRequestType, AxiosResponse<RegisterResponseType>>('auth/register', {
                ...registerData
            });
        return response.data;
    },
    recoverPassword: async (email: string) => {
        const response = await axiosInst
            .post<PasswordRecoveryRequestType, AxiosResponse<PasswordRecoveryResponseType>>('auth/forgot', { // только через хероку
                email,
                from: 'test-front-admin <borisenk-anton@yandex.ru>',
                message: `<div style="background-color: lime; padding: 15px">
password recovery link: <a href='http://localhost:3000/friday_project#/password_recovery/$token$'>link</a>
</div>`
            });
        return response.data;
    }
};

export const packsAPI = {
    getPacks: async (paramsPayload: GetPacksRequestType) => {
        const response = await axiosInst
            .get<GetPacksRequestType, AxiosResponse<GetPacksResponseType>>('cards/pack', {
                params: {
                    ...paramsPayload
                }
            });
        return response.data;
    },
    addNewPack: async (cardsPack: PostPackRequestType) => {
        await axiosInst
            .post('cards/pack', cardsPack);
    },
    deletePack: async (cardsPackId: string) => {
        await axiosInst
            .delete('cards/pack', {
                params: {
                    id: cardsPackId
                }
            });
    },
    updatePack: async (cardsPack: PutPackRequestType) => {
        await axiosInst
            .put('cards/pack', cardsPack);
    },
}

export const cardsAPI = {
    getCards: async (paramsPayload: GetCardsRequestType) => {
        const response = await axiosInst
            .get<GetCardsRequestType, AxiosResponse<GetCardsResponseType>>('cards/card', {
                params: {
                    ...paramsPayload
                }
            });
        return response.data;
    },
    addNewCard: async (card: PostCardRequestType) => {
        await axiosInst
            .post('cards/card', card);
    },
    deleteCard: async (cardId: string) => {
        await axiosInst
            .delete('cards/card', {
                params: {
                    id: cardId
                }
            });
    },
    updateCard: async (card: PutCardRequestType) => {
        await axiosInst
            .put('cards/card', card);
    },
}

export const learnAPI = {
    changeGrade: async (grade: PutGradeRequestType) => {
        await axiosInst
            .put('cards/grade', grade);
    }
}

export const filesAPI = {
    send: async (fileData?: FormData) => {
        await axiosInst
            .post('/file', fileData);
    }
}
