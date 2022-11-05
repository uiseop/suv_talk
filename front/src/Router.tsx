import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./Pages/Error";
import Login from "./Pages/Login";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
