import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../App";

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
    const navigate = useNavigate();
    const { user, handleLogIn } = useContext(UserContext);

    useEffect(() => {
        if (user.id) {
            navigate("/", { replace: true });
        }
    }, [user]);

    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                const onSuccessHandler = (res: AxiosResponse) => {
                    return res;
                };
                const retry = (errorConfig: AxiosRequestConfig) => {
                    return new Promise((res) => {
                        setTimeout(() => {
                            console.log("재시도 중 입니다...");
                            res(axios.request(errorConfig));
                        }, 500);
                    });
                };
                const onFailHandler = (error: AxiosError) => {
                    if (error.response?.status === 400) {
                        return Promise.reject(error);
                    }
                    if (error.config) {
                        return retry(error.config);
                    }
                    return Promise.reject(error);
                };

                const myInterceptor = axios.interceptors.response.use(
                    onSuccessHandler,
                    onFailHandler
                );
                axios
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
                        handleLogIn(res.data["access-token"], res.data.id);
                        navigate("/", { replace: true });
                    })
                    .catch((err) => {
                        console.log(err);
                        toast({
                            title: `로그인에 실패했습니다!`,
                            description: `다시 시도해 주세요!`,
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                        });
                    })
                    .finally(() => resolve());
                axios.interceptors.response.eject(myInterceptor);
            });
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
