import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";

interface IFormValues {
    name: string;
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IFormValues>();
    const toast = useToast();

    const onSubmit: SubmitHandler<IFormValues> = (data) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                toast({
                    title: `로그인이 완료되었습니다!`,
                    description: `${data.name}님 환영합니다!`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                resolve();
            }, 1500);
        });
    };

    return (
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.name?.type === "required"}>
                <FormLabel htmlFor="name">이름</FormLabel>
                <Input
                    id="name"
                    placeholder="name"
                    {...register("name", { required: true })}
                />

                {errors.name?.type === "required" && (
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
