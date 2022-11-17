import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ChatListsContext, MessageContext, UserContext } from "../App";

interface IChat {
    createdAt: string;
    id: number;
    chatName: string;
    updatedAt: string;
}

const Chat = () => {
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const innerRef = useRef<HTMLUListElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { deleteOneChatList } = useContext(ChatListsContext);
    const { messages, getMessages, pushMessage } = useContext(MessageContext);
    const { user } = useContext(UserContext);

    const { state, pathname }: { state: IChat; pathname: string } = location;
    const chatId = pathname.split("/")[2];

    useEffect(() => {
        if (state) {
            setRoomName(state.chatName);
        } else {
            axios
                .get(`/chat/${chatId}`)
                .then((res) => {
                    const chat: IChat[] = res.data.chat;
                    setRoomName(chat[0].chatName);
                })
                .catch((err) => console.log(err));
        }
        innerRef.current?.scrollBy(0, innerRef.current.scrollHeight);
        getMessages(Number(chatId), 0);
    }, [location]);

    useEffect(() => {
        innerRef.current?.scrollBy(0, innerRef.current.scrollHeight);
    }, [messages]);

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
            onSubmitHandler(e);
        }
    };

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post(`/message/${chatId}`, { message: input }).then((res) => {
            const { data: message } = res;
            pushMessage(message.message);
        });
        setInput("");
    };

    const onExitHandler = () => {
        if (window.confirm("채팅방을 나가시겠습니까?")) {
            axios
                .delete(`/chat/${chatId}`)
                .then((res) => {
                    deleteOneChatList(Number(chatId));
                })
                .catch((err) => console.log(err));
            onCloseHandler();
        } else {
            console.log("안나감");
        }
    };

    return (
        <ChatWrapper>
            <ChatHeader>
                <ChatTitle>{roomName}</ChatTitle>
                <ChatExit onClick={onExitHandler}>나가기</ChatExit>
                <CloseBtn onClick={onCloseHandler} />
            </ChatHeader>
            <ChatInner ref={innerRef}>
                {messages.length > 0
                    ? messages.map((message) => (
                          <Message
                              key={message.id}
                              isMine={user.id == message.UserId}
                          >
                              {message.message}
                          </Message>
                      ))
                    : ""}
            </ChatInner>
            <ChatFormWrapper
                onClick={onClickHandler}
                onSubmit={onSubmitHandler}
            >
                <ChatInput
                    ref={inputRef}
                    value={input}
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

const ChatInner = styled.ul`
    display: flex;
    flex-direction: column;
    background-color: #878787;
    overflow-y: auto;
    flex: 1;
    gap: 4px;
    padding: 4px 20px;
`;

const Message = styled.li<{ isMine: boolean }>`
    color: black;
    background-color: ${(props) => (props.isMine ? "white" : "#ffeb3b")};
    align-self: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
    padding: 8px 12px;
    border-radius: 16px;
    max-width: 50%;
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

const ChatExit = styled.button`
    padding: 10px 12px;
    color: white;

    &:hover {
        color: #ffeb3b;
    }
`;

export default Chat;
