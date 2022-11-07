import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Error from "./Pages/Error";
import Login from "./Pages/Login";

const Router = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
