import { Server } from "socket.io";
import { Server as HttpServer } from "http";
let socket: Server;

const io = {
    init: (httpServer: HttpServer) => {
        socket = new Server(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                credentials: true,
            },
        });
    },
    getIo: () => {
        if (!socket) {
            throw new Error("Socket is not Initialized");
        }
        return socket;
    },
};

export default io;
