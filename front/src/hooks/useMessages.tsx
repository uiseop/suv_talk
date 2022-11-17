import axios from "axios";
import { useCallback, useReducer } from "react";

interface IMessage {
    ChatId: number;
    UserId: number;
    content: string;
    createdAt: string;
    id: number;
    updatedAt: string;
}

const initialState = {
    messages: [],
    lastIndex: 10,
    limit: 10,
};

enum MessagesActionType {
    GET = "GET",
    PUSH = "PUSH",
    UPDATEINDEX = "UPDATEINDEX",
}

type MessageAction =
    | {
          type: MessagesActionType.GET;
          messages: IMessage[];
      }
    | {
          type: MessagesActionType.PUSH;
          message: IMessage;
      }
    | {
          type: MessagesActionType.UPDATEINDEX;
      };

// type MessageState = IMessage[];
interface MessageState {
    messages: IMessage[];
    lastIndex: number;
    limit: number;
}

const reducer = (state: MessageState, action: MessageAction) => {
    switch (action.type) {
        case MessagesActionType.GET: {
            const newState = {
                ...state,
                messages: action.messages,
            };
            return newState;
        }
        case MessagesActionType.PUSH: {
            const newMessages = state.messages.concat(action.message);
            const newState = { ...state, messages: newMessages };
            return newState;
        }
        case MessagesActionType.UPDATEINDEX: {
            const newState = {
                ...state,
                lastIndex: state.lastIndex + state.limit,
            };
            return newState;
        }
        default:
            throw new Error("Invalid Action Type");
    }
};

const useMessages = () => {
    const [messages, dispatch] = useReducer(reducer, initialState);

    const getMessages = useCallback(
        (chatId: number, lastIndex: number, limit: number) => {
            axios
                .get(`/message/${chatId}`, { params: { lastIndex, limit } })
                .then((res) => {
                    dispatch({
                        type: MessagesActionType.GET,
                        messages: res.data.messages,
                    });
                });
        },
        []
    );

    const pushMessage = useCallback((message: IMessage) => {
        dispatch({ type: MessagesActionType.PUSH, message });
    }, []);

    const updateIndex = useCallback(() => {
        dispatch({ type: MessagesActionType.UPDATEINDEX });
    }, []);

    return { messages, getMessages, pushMessage, updateIndex };
};

export default useMessages;
