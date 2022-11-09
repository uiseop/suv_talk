import styled from "styled-components";

const Chat = () => {
    return (
        <ChatWrapper>
            <ChatHeader>
                <CloseBtn />
            </ChatHeader>
            <ChatInner></ChatInner>
            <ChatInputWrapper></ChatInputWrapper>
        </ChatWrapper>
    );
};

const ChatWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    background-color: #f3f0e7;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const ChatHeader = styled.nav`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 15px;
    height: 60px;
`;

const CloseBtn = styled.button`
    position: relative;
    display: inline-block;
    width: 30px;
    height: 30px;

    &::before,
    &::after {
        position: absolute;
        top: 0;
        content: " ";
        height: 30px;
        width: 2px;
        background-color: #fff;
    }

    &:hover {
        &::before,
        &::after {
            background-color: #ffeb3b;
        }
    }

    &::before {
        transform: rotate(45deg);
    }

    &::after {
        transform: rotate(-45deg);
    }
`;

const ChatInner = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #878787;
    flex: 1;
`;

const ChatInputWrapper = styled.div`
    background-color: #cecece;
    height: 45px;
`;

export default Chat;
