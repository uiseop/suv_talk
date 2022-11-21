import { useCallback, useReducer } from "react";
import { io, Socket } from "socket.io-client";

const initialState = null;

enum SocketActionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}
type SocketState = null | Socket;

type SocketAction =
    | { type: SocketActionType.LOGIN }
    | { type: SocketActionType.LOGOUT };

const reducer = (state: SocketState, action: SocketAction) => {
    switch (action.type) {
        case SocketActionType.LOGIN:
            return io("http://localhost:8000", {
                withCredentials: true,
            });
        case SocketActionType.LOGOUT:
            state?.disconnect();
            return initialState;
    }
};

const useSocket = () => {
    const [socket, dispatch] = useReducer(reducer, initialState);

    const setSocket = useCallback(() => {
        dispatch({ type: SocketActionType.LOGIN });
    }, []);

    const closeSocket = useCallback(() => {
        dispatch({ type: SocketActionType.LOGOUT });
    }, []);

    return { socket, setSocket, closeSocket };
};

export default useSocket;
