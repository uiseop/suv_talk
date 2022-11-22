import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = () => {
    const webSocketUrl = "ws://localhost:8000";
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        console.log("hello?");
        setSocket(io(webSocketUrl));
    }, []);

    return socket;
};

export default useSocket;
