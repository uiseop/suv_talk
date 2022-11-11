import { useCallback, useReducer } from "react";
import { deleteCookie, getCookie } from "../utils/cookie";

const initialState = getCookie("access-token");

enum UserActionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

type UserState = string;

type UserAction =
    | { type: UserActionType.LOGIN; username: string }
    | { type: UserActionType.LOGOUT };

const reducer = (state: UserState, action: UserAction): string => {
    switch (action.type) {
        case UserActionType.LOGIN:
            return action.username;
        case UserActionType.LOGOUT:
            deleteCookie("access-token");
            return "";
        default:
            throw new Error("Invaid action tpye");
    }
};
const useUser = () => {
    const [user, dispatch] = useReducer(reducer, initialState);

    const handleLogIn = useCallback((username: string) => {
        dispatch({ type: UserActionType.LOGIN, username });
    }, []);

    const handleLogOut = useCallback(() => {
        dispatch({ type: UserActionType.LOGOUT });
    }, []);

    return { user, handleLogIn, handleLogOut };
};

export default useUser;
