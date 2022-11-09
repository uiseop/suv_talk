import { useRef } from "react";
import styled from "styled-components";

const Chat = () => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const resize = (e: React.KeyboardEvent) => {
        if (inputRef.current && inputRef.current.style.height !== "85px") {
            inputRef.current.style.height = "1px";
            inputRef.current.style.height =
                12 + e.currentTarget.scrollHeight + "px";
        }
    };
    return (
        <ChatWrapper>
            <ChatHeader>
                <ChatTitle>웹 개발자</ChatTitle>
                <CloseBtn />
            </ChatHeader>
            <ChatInner></ChatInner>
            <ChatInputWrapper>
                <ChatInput ref={inputRef} onKeyDown={resize} />
            </ChatInputWrapper>
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
    border: 1px solid #807676;
`;

const ChatHeader = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 15px;
    height: 60px;
`;

const ChatTitle = styled.strong`
    color: #8d7a7a;
    font-weight: bold;
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
    background-color: #fff;
    min-height: 45px;
    display: flex;
    padding: 1rem;
`;

const ChatInput = styled.textarea`
    max-height: 80px;
    width: 100%;
    font-size: 13px;
    border: none;
    overflow: visible;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/
`;

export default Chat;
