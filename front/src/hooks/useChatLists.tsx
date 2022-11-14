import axios from "axios";
import { useCallback, useReducer } from "react";

enum ChatListActionType {
    GET = "GET",
    DELETE = "DELETE",
}

interface IChat {
    createdAt: string;
    id: number;
    room_name: string;
    updatedAt: string;
}

type ChatListState = IChat[];
type ChatListAction =
    | { type: ChatListActionType.GET; chatLists: IChat[] }
    | { type: ChatListActionType.DELETE; chatId: number };

const initialState: IChat[] = [];

const reducer = (state: ChatListState, action: ChatListAction) => {
    switch (action.type) {
        case ChatListActionType.GET:
            return action.chatLists;
        case ChatListActionType.DELETE:
            return state.filter((chat) => chat.id != action.chatId);
        default:
            throw new Error("Invalid Action Type");
    }
};

const useChatLists = () => {
    const [chatLists, dispatch] = useReducer(reducer, initialState);

    const getChatLists = useCallback(() => {
        axios
            .get("/chat")
            .then((res) => {
                const { data: response } = res;
                return dispatch({
                    type: ChatListActionType.GET,
                    chatLists: response.response,
                });
            })
            .catch((err) => {
                return console.log(err);
            });
    }, []);

    const deleteOneChatList = useCallback((chatId: number) => {
        dispatch({ type: ChatListActionType.DELETE, chatId });
    }, []);

    return { chatLists, getChatLists, deleteOneChatList };
};

export default useChatLists;
