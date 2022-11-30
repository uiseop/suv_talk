import { backInstance } from "./axios";
import { LoginFailure, LoginStart, LoginSuccess } from "./Context/UserAction";
import { UserAction } from "./@types/user";

export const loginCall = async (
    username: string,
    dispatch: React.Dispatch<UserAction>
) => {
    dispatch(LoginStart());
    try {
        const { data } = await backInstance.post("/user/signin", { username });
        console.log(data, "haha");
        dispatch(LoginSuccess(data.user));
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = "로그인 실패";
        dispatch(LoginFailure(message));
    }
};
