import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IChat {
    createdAt: string;
    id: number;
    chatName: string;
    updatedAt: string;
}

const ChatList = ({ chat }: { chat: IChat }) => {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(`./${chat.id}`);
    };
    return (
        <ChatWrapper onClick={onClickHandler}>
            <ImageWrapper></ImageWrapper>
            <ChatDescWrapper>
                <h2>{chat.chatName}</h2>
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
