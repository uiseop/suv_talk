import { useState } from "react";
import styled from "styled-components";
import Chat from "../Components/Chat";
import ChatList from "../Components/ChatList";
import Title from "../Components/Title";

const Chattings = () => {
    const [isChat, setIsChat] = useState(false);
    return (
        <>
            <Title>채팅</Title>
            <ChatsWrapper>
                <ChatList setIsChat={setIsChat} />
                <ChatList />
                <ChatList />
                <ChatList />
                <ChatList />
                {isChat ? <Chat /> : ""}
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

export default Chattings;
