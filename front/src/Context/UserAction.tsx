import { IUser, UserAction } from "../@types/user";

export const LoginStart = (): UserAction => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user: IUser): UserAction => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error: string): UserAction => ({
    type: "LOGIN_FAILURE",
    payload: error,
});
