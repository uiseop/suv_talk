import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createContext } from "react";
import { CookiesProvider } from "react-cookie";
import { io, Socket } from "socket.io-client";
import useChatLists from "./hooks/useChatLists";
import useMessages from "./hooks/useMessages";
import useSocket from "./hooks/useSocket";
import useUser from "./hooks/useUser";
import Router from "./Router";

const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
    },
};

const theme = extendTheme({ colors });

interface IMessage {
    ChatId: number;
    UserId: number;
    content: string;
    createdAt: string;
    id: number;
    updatedAt: string;
}

interface IChat {
    createdAt: string;
    id: number;
    chatName: string;
    updatedAt: string;
    lastContent: string;
}

interface UserState {
    nickname: string | null;
    id: number | null;
}

export const UserContext = createContext({
    user: { nickname: null, id: null } as UserState,
    handleLogIn: (username: string, id: number) => {},
    handleLogOut: () => {},
});

export const ChatListsContext = createContext({
    chatLists: [] as IChat[],
    getChatLists: () => {},
    deleteOneChatList: (chatId: number) => {},
    updateChatLists: (message: IMessage) => {},
});

export const MessageContext = createContext({
    messages: { messages: [] as IMessage[], lastIndex: 0, limit: 10 },
    getMessages: (chatId: number, lastIndex: number, limit: number) => {},
    pushMessage: (message: IMessage) => {},
    updateIndex: () => {},
});

export const SocketContext = createContext<Socket | null>(null);

const App = () => {
    const user = useUser();
    const chatLists = useChatLists();
    const messages = useMessages();
    const socket = useSocket();

    return (
        <>
            <UserContext.Provider value={user}>
                <ChatListsContext.Provider value={chatLists}>
                    <MessageContext.Provider value={messages}>
                        <SocketContext.Provider value={socket}>
                            <CookiesProvider>
                                <ChakraProvider theme={theme}>
                                    <Router />
                                </ChakraProvider>
                            </CookiesProvider>
                        </SocketContext.Provider>
                    </MessageContext.Provider>
                </ChatListsContext.Provider>
            </UserContext.Provider>
        </>
    );
};

export default App;
