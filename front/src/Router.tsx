import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Navigation from "./Components/Navigation";
import AddItem from "./Pages/AddItem";
import Chattings from "./Pages/Chattings";
import Error from "./Pages/Error";
import Items from "./Pages/Items";
import Login from "./Pages/Login";

const Router = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Items />} />
                    <Route path="/add-product" element={<AddItem />} />
                    <Route path="/chattings" element={<Chattings />} />
                    <Route path="/*" element={<Error />} />
                </Routes>
            </Main>
        </BrowserRouter>
    );
};

const Main = styled.main`
    padding: 1rem;
`;

export default Router;
