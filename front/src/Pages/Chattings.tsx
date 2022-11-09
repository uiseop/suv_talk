import styled from "styled-components";
import ChatList from "../Components/ChatList";
import Title from "../Components/Title";

const Chattings = () => {
    return (
        <>
            <Title>채팅</Title>
            <ChatsWrapper>
                <ChatList />
                <ChatList />
                <ChatList />
                <ChatList />
                <ChatList />
            </ChatsWrapper>
        </>
    );
};

const ChatsWrapper = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export default Chattings;
