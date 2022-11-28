export const LoginStart = (userName) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCEESS",
    payload: user,
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
});
