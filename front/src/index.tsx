import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserContextProvider } from "./Context/UserContext";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </React.StrictMode>
);
