import { IUser, UserAction, UserActionType } from "../@types/user";

export const LoginStart = (): UserAction => ({
    type: UserActionType.LOGINSTART,
});

export const LoginSuccess = (user: IUser): UserAction => ({
    type: UserActionType.LOGINSUCCESS,
    payload: user,
});

export const LoginFailure = (error: string): UserAction => ({
    type: UserActionType.LOGINFAILURE,
    payload: error,
});
