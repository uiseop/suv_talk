import { Button } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../App";

const MyInfo = () => {
    const { user, handleLogOut } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user.id) {
            navigate("/");
        }
    }, [user]);
    return (
        <>
            <Header>{user.uid}</Header>
            <Button onClick={handleLogOut}>로그아웃</Button>
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
