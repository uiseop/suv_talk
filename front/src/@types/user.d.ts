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
export interface IUserContext {
    user: IUser | null;
    isFetching: boolean;
    error: boolean | string;
    dispatch: React.Dispatch<UserAction>;
}

export type UserAction =
    | {
          type: "LOGIN_START";
      }
    | {
          type: "LOGIN_SUCCESS";
          payload: IUser;
      }
    | {
          type: "LOGIN_FAILURE";
          payload: string;
      };
