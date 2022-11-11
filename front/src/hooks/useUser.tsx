import { useCallback, useReducer } from "react";

const initialState = "";

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
            return "";
        default:
            throw new Error("Invaid action tpye");
    }
};
const useUser = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleLogIn = useCallback((username: string) => {
        dispatch({ type: UserActionType.LOGIN, username });
    }, []);

    const handleLogOut = useCallback(() => {
        dispatch({ type: UserActionType.LOGOUT });
    }, []);

    return { state, handleLogIn, handleLogOut };
};

export default useUser;
