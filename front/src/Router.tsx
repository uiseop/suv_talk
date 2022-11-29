import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IUserContext } from "./@types/user";
import { UserContext } from "./Context/UserContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
const Router = () => {
    const { user } = useContext(UserContext) as IUserContext;
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to={"/login"} />}
                />
                <Route
                    path="/login"
                    element={user ? <Navigate to={"/"} /> : <Login />}
                />
                <Route
                    path="/profile/:username"
                    element={user ? <Profile /> : <Navigate to={"/login"} />}
                />
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
