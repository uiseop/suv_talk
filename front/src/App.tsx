import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import GlobalStyles from "./GlobalStyles";
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
            <ChakraProvider theme={theme}>
                <Router />
            </ChakraProvider>
        </>
    );
};

export default App;
