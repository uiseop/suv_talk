import React, { createContext, useReducer } from "react";
import { Props } from "../@types";
import { UserState } from "../@types/user";
import UserReducer from "./UserReducer";

const INITIAL_STATE: UserState = {
    user: null,
    isFetching: false,
    error: false,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider: React.FC<Props> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
