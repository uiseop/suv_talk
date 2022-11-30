import React, { createContext, useReducer } from "react";
import { Props } from "../@types";
import { IUserContext, UserState } from "../@types/user";
import UserReducer from "./UserReducer";

const INITIAL_STATE: UserState = {
    // user: null,
    user: {
        coverImage: "",
        createdAt: "2022-11-29T15:29:18.469Z",
        followers: [],
        followings: ["6380b678034c0237fe4e59ad", "6380be224c46ee0b15e7f394"],
        isAdmin: false,
        profileImage: "",
        username: "test",
        desc: "",
        __v: 0,
        _id: "6386254e529422e72ebe6cee",
    },
    isFetching: false,
    error: false,
};

export const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
