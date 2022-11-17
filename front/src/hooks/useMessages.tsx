import axios from "axios";
import { useCallback, useContext, useReducer } from "react";
import { UserContext } from "../App";

interface IMessage {
    ChatId: number;
    UserId: number;
    content: string;
    createdAt: string;
    id: number;
    updatedAt: string;
}

const initialState: IMessage[] = [];

enum MessagesActionType {
    GET = "GET",
    PUSH = "PUSH",
}

type MessageAction =
    | {
          type: MessagesActionType.GET;
          messages: IMessage[];
      }
    | {
          type: MessagesActionType.PUSH;
          message: IMessage;
      };

type MessageState = IMessage[];

const reducer = (state: MessageState, action: MessageAction) => {
    switch (action.type) {
        case MessagesActionType.GET:
            return action.messages;
        case MessagesActionType.PUSH:
            const new_State = state.concat(action.message);
            return new_State;
        default:
            throw new Error("Invalid Action Type");
    }
};

const useMessages = () => {
    const [messages, dispatch] = useReducer(reducer, initialState);

    const getMessages = useCallback((chatId: number, page: number) => {
        axios.get(`/message/${chatId}`).then((res) => {
            dispatch({
                type: MessagesActionType.GET,
                messages: res.data.messages,
            });
        });
    }, []);

    const pushMessage = useCallback((message: IMessage) => {
        dispatch({ type: MessagesActionType.PUSH, message });
    }, []);

    return { messages, getMessages, pushMessage };
};

export default useMessages;
