import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IChat {
    createdAt: string;
    id: number;
    room_name: string;
    updatedAt: string;
}

const Chat = () => {
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { state }: { state: IChat } = location;

    useEffect(() => {
        if (state) {
            setRoomName(state.room_name);
        } else {
            // axios.get()
        }
    }, []);

    const onCloseHandler = () => {
        navigate("../");
    };

    const onClickHandler = () => {
        inputRef.current?.focus();
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.currentTarget.value);
        if (inputRef.current) {
            inputRef.current.style.height = "1px";
        }
        if (inputRef.current && parseInt(inputRef.current.style.height) < 80) {
            inputRef.current.style.height =
                12 + e.currentTarget.scrollHeight + "px";
        }
    };

    const onEnterHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.nativeEvent.isComposing) {
            return;
        }
        if (e.key === "Enter" && e.shiftKey) {
            return;
        } else if (e.key === "Enter") {
            alert("heelo!! 이제 메시지를 보내면 돼");
            onSubmitHandler(e);
        }
    };

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("/");
    };

    return (
        <ChatWrapper>
            <ChatHeader>
                <ChatTitle>웹 개발자</ChatTitle>
                <CloseBtn onClick={onCloseHandler} />
            </ChatHeader>
            <ChatInner></ChatInner>
            <ChatFormWrapper
                onClick={onClickHandler}
                onSubmit={onSubmitHandler}
            >
                <ChatInput
                    ref={inputRef}
                    defaultValue={input}
                    onChange={onChangeHandler}
                    onKeyDown={onEnterHandler}
                />
                <ChatOptionWrapper>
                    <ChatEnterBtn
                        type="submit"
                        disabled={input === "" ? true : false}
                    >
                        전송
                    </ChatEnterBtn>
                </ChatOptionWrapper>
            </ChatFormWrapper>
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

const ChatFormWrapper = styled.form`
    background-color: #fff;
    min-height: 45px;
    display: flex;
    flex-direction: column;
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

const ChatOptionWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const ChatEnterBtn = styled.button<{ disabled: boolean }>`
    padding: 12px 15px;
    font-size: 13px;
    color: ${(props) => (props.disabled ? "grey" : "black")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export default Chat;
