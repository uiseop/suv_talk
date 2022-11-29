import { styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

const Home = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/user/6380be224c46ee0b15e7f394`);
            console.log(res)
        };
        fetchUser()
    });
    return (
        <>
            <Topbar />
            <HomeContaier>
                <Sidebar />
                <Feed />
                <Rightbar />
            </HomeContaier>
        </>
    );
};

const HomeContaier = styled("div")({
    display: "flex",
    width: "100%",
});

export default Home;
