import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = () => {
    const webSocketUrl = "ws://localhost:8000";
    const socket = useRef<Socket | null>(null);

    useEffect(() => {
        console.log("hello?");
        socket.current = io(webSocketUrl);
    }, []);

    useEffect(() => {
        socket.current!.on("connection", (socket) => {
            console.log("hello It's connected");
        });
    }, []);

    return socket;
};

export default useSocket;
