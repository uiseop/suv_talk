import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createContext } from "react";
import { CookiesProvider } from "react-cookie";
import GlobalStyles from "./GlobalStyles";
import useChatLists from "./hooks/useChatLists";
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

interface IChat {
    createdAt: string;
    id: number;
    room_name: string;
    updatedAt: string;
}

export const UserContext = createContext({
    user: "",
    handleLogIn: (username: string) => {},
    handleLogOut: () => {},
});

export const ChatListsContext = createContext({
    chatLists: [] as IChat[],
    getChatLists: () => {},
    deleteOneChatList: (chatId: number) => {},
});

const App = () => {
    const user = useUser();
    const chatLists = useChatLists();
    return (
        <>
            <UserContext.Provider value={user}>
                <ChatListsContext.Provider value={chatLists}>
                    <GlobalStyles />
                    <CookiesProvider>
                        <ChakraProvider theme={theme}>
                            <Router />
                        </ChakraProvider>
                    </CookiesProvider>
                </ChatListsContext.Provider>
            </UserContext.Provider>
        </>
    );
};

export default App;
