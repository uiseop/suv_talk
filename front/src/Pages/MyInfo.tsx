import { Button } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { deleteCookie, getCookie } from "../utils/cookie";

const MyInfo = () => {
    const uid = getCookie("access-token");

    const onClickHandler = () => {
        console.log("hello!");
        deleteCookie("access-token");
    };
    console.log(uid);
    return (
        <>
            <Header>{uid}</Header>
            <Button onClick={onClickHandler}>로그아웃</Button>
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
