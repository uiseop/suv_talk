import styled from "styled-components";

const ChatList = () => {
    return (
        <ChatWrapper>
            <ImageWrapper></ImageWrapper>
            <ChatDescWrapper>
                <h2>채팅 타이틀</h2>
                <p>채팅채팅</p>
            </ChatDescWrapper>
        </ChatWrapper>
    );
};



const ChatWrapper = styled.li`
    display: flex;
    align-items: center;
    gap: 12px;

    &:hover {
        background-color: #ff63472b;
        cursor: pointer;
    }
`;

const ImageWrapper = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: tomato;
`;

const ChatDescWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export default ChatList;
