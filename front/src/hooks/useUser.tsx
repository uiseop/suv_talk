import axios from "axios";
import { useCallback, useReducer } from "react";
import { deleteCookie, getCookie } from "../utils/cookie";

const initialState = {
    nickname: getCookie("access-token"),
    id: Number(getCookie("id")),
};

enum UserActionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

interface UserState {
    nickname: string | null;
    id: number | null;
}

type UserAction =
    | { type: UserActionType.LOGIN; username: string; id: number }
    | { type: UserActionType.LOGOUT };

const reducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case UserActionType.LOGIN:
            return {
                nickname: action.username,
                id: action.id,
            };
        case UserActionType.LOGOUT: {
            return {
                nickname: null,
                id: null,
            };
        }
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
        axios
            .delete("/user")
            .then(() => {
                deleteCookie("access-token");
                deleteCookie("id");
                dispatch({ type: UserActionType.LOGOUT });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return { user, handleLogIn, handleLogOut };
};

export default useUser;
