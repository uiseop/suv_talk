import { IUser, UserAction, UserActionType } from "../@types/user";

export const LoginStart = (userName: string): UserAction => ({
    type: UserActionType.LOGINSTART,
    payload: userName,
});

export const LoginSuccess = (user: IUser): UserAction => ({
    type: UserActionType.LOGINSUCCESS,
    payload: user,
});

export const LoginFailure = (error: string): UserAction => ({
    type: UserActionType.LOGINFAILURE,
    payload: error,
});
