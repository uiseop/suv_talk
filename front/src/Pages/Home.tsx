import { styled } from "@mui/material";
import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

const Home = () => {
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
