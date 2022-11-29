import { styled } from "@mui/material";
import { FormEvent, useRef } from "react";

const Login = () => {
    const username = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <LoginContainer>
            <LoginWrapper>
                <LoginLeft>
                    <LoginLogo>Suv:Dev</LoginLogo>
                    <LoginDesc>
                        환영합니다.
                        <br /> 간단한 닉네임을 설정한 후 방문해주세요!
                    </LoginDesc>
                </LoginLeft>
                <LoginRight>
                    <LoginForm>
                        <LoginInput
                            placeholder="닉네임을 입력해주세요"
                            required
                            ref={username}
                        />
                    </LoginForm>
                    <LoginButton>방문하기</LoginButton>
                </LoginRight>
            </LoginWrapper>
        </LoginContainer>
    );
};

export default Login;

const LoginContainer = styled("div")({
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const LoginWrapper = styled("div")({
    width: "70%",
    height: "70%",
    display: "flex",
});

const LoginLeft = styled("div")({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
});

const LoginRight = LoginLeft;

const LoginLogo = styled("h3")({
    fontSize: "50px",
    fontWeight: 800,
    color: "#1775ee",
    marginBottom: "10px",
});

const LoginDesc = styled("span")({
    fontSize: "24px",
});

const LoginForm = styled("form")({
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
});

const LoginInput = styled("input")({
    height: "50px",
    borderRadius: "10px",
    border: "1px solid gray",
    fontSize: "18px",
    paddingLeft: "20px",

    "&:focus": {
        outline: "none",
    },
});

const LoginButton = styled("button")({
    height: "50px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#1775ee",
    color: "white",
    fontSize: "20px",
    fontWeight: 500,
    cursor: "pointer",

    "&:focus": {
        outline: "none",
    },

    "&:disabled": {
        cursor: "not-allowed",
    },
});

const LoginForgot = styled("span")({
    textAlign: "center",
    color: "#1775ee",
});

const LoginRegisterButton = styled("button")({
    width: "60%",
    alignSelf: "center",
    height: "50px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#42b72a",
    color: "white",
    fontSize: "20px",
    fontWeight: 500,
    cursor: "pointer",
});
