import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Chat from "./Components/Chat";
import Navigation from "./Components/Navigation";
import AddItem from "./Pages/Addchat";
import Chattings from "./Pages/Chattings";
import Error from "./Pages/Error";
import Items from "./Pages/Users";
import Login from "./Pages/Login";
import MyInfo from "./Pages/MyInfo";

const Router = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Items />} />
                    <Route path="/chattings" element={<Chattings />}>
                        <Route path=":chatId" element={<Chat />} />
                    </Route>
                    <Route path="/myinfo" element={<MyInfo />} />
                    <Route path="/*" element={<Error />} />
                </Routes>
            </Main>
        </BrowserRouter>
    );
};

const Main = styled.main`
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export default Router;
