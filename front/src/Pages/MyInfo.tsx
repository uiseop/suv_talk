import { Button } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SocketContext, UserContext } from "../App";

const MyInfo = () => {
    const { user, handleLogOut } = useContext(UserContext);
    const { closeSocket } = useContext(SocketContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        handleLogOut();
        closeSocket();
    };

    useEffect(() => {
        if (!user.id) {
            navigate("/");
        }
    }, [user]);
    return (
        <>
            <Header>{user.nickname}</Header>
            <Button onClick={logoutHandler}>로그아웃</Button>
        </>
    );
};

const Header = styled.header`
    padding: 1rem;

    & h1 {
        font-size: 1.2rem;
        text-align: center;
    }
`;

export default MyInfo;
