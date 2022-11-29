export interface IUser {
    coverImage: string;
    createdAt: string;
    followers: string[];
    followings: string[];
    isAdmin: false;
    profileImage: string;
    username: string;
    __v: 0;
    _id: string;
}

export interface UserState {
    user: IUser | null;
    isFetching: boolean;
    error: boolean | string;
}

export enum UserActionType {
    LOGINSTART = "LOGIN_START",
    LOGINSUCCESS = "LOGIN_SUCCESS",
    LOGINFAILURE = "LOGIN_FAILURE",
}

export type UserAction =
    | {
          type: UserActionType.LOGINSTART;
          payload: string;
      }
    | {
          type: UserActionType.LOGINSUCCESS;
          payload: IUser;
      }
    | {
          type: UserActionType.LOGINFAILURE;
          payload: string;
      };
