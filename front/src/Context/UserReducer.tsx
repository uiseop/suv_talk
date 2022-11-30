import { UserState, UserAction } from "../@types/user";

const UserReducer = (state: UserState, action: UserAction) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload,
            };
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user!,
                    followings: [
                        ...state.user!.followings,
                        action.payload,
                    ] as string[],
                },
            };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user!,
                    followings: state.user?.followings.filter(
                        (followingId) => followingId !== action.payload
                    ) as string[],
                },
            };

        default:
            return state;
    }
};

export default UserReducer;
