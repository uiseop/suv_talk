import axios from "axios";
import { useCallback, useContext, useReducer } from "react";
import { UserContext } from "../App";

interface IMessage {
    ChatItemId: number;
    UserId: number;
    createdAt: string;
    id: number;
    message: string;
    updatedAt: string;
}

const initialState: IMessage[] = [];

enum MessagesActionType {
    GET = "GET",
    UPDATE = "UPDATE",
}

type MessageAction =
    | {
          type: MessagesActionType.GET;
          messages: IMessage[];
      }
    | {
          type: MessagesActionType.UPDATE;
          message: IMessage;
      };

type MessageState = IMessage[];

const reducer = (state: MessageState, action: MessageAction) => {
    switch (action.type) {
        case MessagesActionType.GET:
            return action.messages;
        case MessagesActionType.UPDATE:
            state.push(action.message);
            return state;
        default:
            throw new Error("Invalid Action Type");
    }
};

const useMessages = () => {
    const [messages, dispatch] = useReducer(reducer, initialState);
    const { user } = useContext(UserContext);

    const getMessages = useCallback((chatId: number, page: number) => {
        axios.get(`/message/${chatId}/${page}`).then((res) => {
            console.log(res, "이것이 내가 원하는 결과다");
            dispatch({
                type: MessagesActionType.GET,
                messages: res.data.messages,
            });
        });
    }, []);

    return { messages, getMessages };
};

export default useMessages;
