import axios from "axios";
import { useCallback, useContext, useReducer } from "react";

enum ChatListActionType {
    GET = "GET",
    DELETE = "DELETE",
    UPDATE = "UPDATE",
}

interface IMessage {
    ChatId: number;
    UserId: number;
    content: string;
    createdAt: string;
    id: number;
    updatedAt: string;
}

interface IChat {
    createdAt: string;
    id: number;
    chatName: string;
    updatedAt: string;
    lastContent: string;
}

type ChatListState = IChat[];
type ChatListAction =
    | { type: ChatListActionType.GET; chatLists: IChat[] }
    | { type: ChatListActionType.DELETE; chatId: number }
    | { type: ChatListActionType.UPDATE; message: IMessage };

const initialState: IChat[] = [];

const reducer = (state: ChatListState, action: ChatListAction) => {
    switch (action.type) {
        case ChatListActionType.GET:
            return action.chatLists;
        case ChatListActionType.DELETE:
            return state.filter((chat) => chat.id !== action.chatId);
        case ChatListActionType.UPDATE:
            const chatId = action.message.ChatId;
            const chat = { ...state.find((chat) => chat.id === chatId) };
            chat.lastContent = action.message.content;
            const chatIndex = state.findIndex((chat) => chat.id === chatId);
            const n_state = state.splice(chatIndex, 1, chat as IChat);
            return n_state
        default:
            throw new Error("Invalid Action Type");
    }
};

const useChatLists = () => {
    const [chatLists, dispatch] = useReducer(reducer, initialState);

    const getChatLists = useCallback(() => {
        axios
            .get("/user/chats")
            .then((res) => {
                const { data: response } = res;
                console.log(response);
                return dispatch({
                    type: ChatListActionType.GET,
                    chatLists: response.chatItems,
                });
            })
            .catch((err) => {
                return console.log(err);
            });
    }, []);

    const updateChatLists = useCallback((message: IMessage) => {
        dispatch({ type: ChatListActionType.UPDATE, message });
    }, []);

    const deleteOneChatList = useCallback((chatId: number) => {
        dispatch({ type: ChatListActionType.DELETE, chatId });
    }, []);

    return { chatLists, getChatLists, deleteOneChatList, updateChatLists };
};

export default useChatLists;
