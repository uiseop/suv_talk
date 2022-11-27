import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile/:username" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
