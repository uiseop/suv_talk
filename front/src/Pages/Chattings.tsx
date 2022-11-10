import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Chat from "../Components/Chat";
import ChatList from "../Components/ChatList";
import Title from "../Components/Title";

interface IChat {
    createdAt: string;
    id: number;
    room_name: string;
    updatedAt: string;
}

const Chattings = () => {
    const [chattings, setChattings] = useState<IChat[]>([]);

    useEffect(() => {
        axios
            .get("chat")
            .then((res) => {
                const { data: response } = res;
                // console.log(response, "haha");
                setChattings(response.response);
            })
            .catch((err) => {
                console.log(err, "ㅜㅜ");
            });
    }, []);

    return (
        <>
            <Title>채팅</Title>
            <ChatsWrapper>
                {chattings.length > 0 ? (
                    chattings.map((chatting) => {
                        return <ChatList chat={chatting} key={chatting.id} />;
                    })
                ) : (
                    <Header>존재하는 채팅방이 없습니다</Header>
                )}
                <Outlet />
            </ChatsWrapper>
        </>
    );
};

const ChatsWrapper = styled.ul`
    flex: 1;
    position: relative;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Header = styled.header`
    padding: 1rem;

    & h1 {
        font-size: 1.2rem;
        text-align: center;
    }
`;

export default Chattings;
