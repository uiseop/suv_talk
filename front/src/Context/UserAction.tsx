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

export const Follow = (userId: string): UserAction => ({
    type: "FOLLOW",
    payload: userId,
});

export const UnFollow = (userId: string): UserAction => ({
    type: "UNFOLLOW",
    payload: userId,
});
