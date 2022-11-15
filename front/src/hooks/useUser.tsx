import { useCallback, useReducer } from "react";
import { deleteCookie, getCookie } from "../utils/cookie";

const initialState = {
    uid: getCookie("access-token"),
    id: null,
};

enum UserActionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

interface UserState {
    uid: string | null;
    id: number | null;
};

type UserAction =
    | { type: UserActionType.LOGIN; username: string; id: number }
    | { type: UserActionType.LOGOUT };

const reducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case UserActionType.LOGIN:
            return {
                uid: action.username,
                id: action.id,
            };
        case UserActionType.LOGOUT:
            deleteCookie("access-token");
            return {
                uid: null,
                id: null,
            };
        default:
            throw new Error("Invaid action tpye");
    }
};
const useUser = () => {
    const [user, dispatch] = useReducer(reducer, initialState);

    const handleLogIn = useCallback((username: string, id: number) => {
        dispatch({ type: UserActionType.LOGIN, username, id });
    }, []);

    const handleLogOut = useCallback(() => {
        dispatch({ type: UserActionType.LOGOUT });
    }, []);

    return { user, handleLogIn, handleLogOut };
};

export default useUser;
