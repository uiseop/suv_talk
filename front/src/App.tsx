import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createContext } from "react";
import { CookiesProvider } from "react-cookie";
import GlobalStyles from "./GlobalStyles";
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

export const UserContext = createContext({
    user: "",
    handleLogIn: (username: string) => {},
    handleLogOut: () => {},
});

const App = () => {
    const props = useUser();
    return (
        <>
            <UserContext.Provider value={props}>
                <GlobalStyles />
                <CookiesProvider>
                    <ChakraProvider theme={theme}>
                        <Router />
                    </ChakraProvider>
                </CookiesProvider>
            </UserContext.Provider>
        </>
    );
};

export default App;
