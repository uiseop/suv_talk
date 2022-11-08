import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface IFormValues {
    uid: string;
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IFormValues>();
    const toast = useToast();
    const [cookies, setCookie, removeCookie] = useCookies(["access-token"]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies["access-token"]) {
            navigate("/", { replace: true });
        }
    }, []);

    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        return axios
            .post("/user/join", {
                uid: data.uid,
            })
            .then((res) => {
                toast({
                    title: `로그인이 완료되었습니다!`,
                    description: `${data.uid}님 환영합니다!`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setCookie("access-token", res.data["access-token"]);
                navigate("/", { replace: true });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.uid?.type === "required"}>
                <FormLabel htmlFor="name">이름</FormLabel>
                <Input
                    id="name"
                    placeholder="name"
                    {...register("uid", { required: true })}
                />

                {errors.uid?.type === "required" && (
                    <FormErrorMessage>이름은 필수입니다</FormErrorMessage>
                )}
            </FormControl>

            <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
            >
                입장하기
            </Button>
        </LoginForm>
    );
};

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export default Login;
