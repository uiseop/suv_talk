import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";
import Router from "./Router";

const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
    },
};

const theme = extendTheme({ colors });

const App = () => {
    return (
        <>
            <CookiesProvider>
                <ChakraProvider theme={theme}>
                    <Router />
                </ChakraProvider>
            </CookiesProvider>
        </>
    );
};

export default App;
