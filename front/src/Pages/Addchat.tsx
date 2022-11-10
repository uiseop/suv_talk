import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../Common/Common";
import Title from "../Components/Title";

interface IChat {
    createdAt: string;
    id: number;
    room_name: string;
    updatedAt: string;
}

const AddItem = () => {
    const [input, setInput] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();

    const submitHandler = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            setIsFetching(true);
            e.preventDefault();
            axios
                .post("chat", { room_name: input })
                .then((res) => {
                    const chat: IChat = res.data.response;
                    navigate(`/chattings/${chat.id}`, {
                        state: chat,
                    });
                })
                .catch((err) => {
                    alert(`${input}의 방을 생성하는데 실패하였습니다.`);
                    console.log(err);
                })
                .finally(() => {
                    setIsFetching(false);
                });
        },
        [input]
    );

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value);
    };

    return (
        <>
            <Title>추가하기</Title>
            <ProductForm onSubmit={submitHandler}>
                <div>
                    <Label>채팅방 제목</Label>
                    <Input onChange={onChangeHandler} defaultValue={input} required />
                </div>
                <Button type="submit" disabled={isFetching}>
                    {isFetching ? "채팅방 생성중.." : "방 생성하기"}
                </Button>
            </ProductForm>
        </>
    );
};

const ProductForm = styled.form`
    width: 20rem;
    max-width: 90%;
    margin: auto;
`;

const Label = styled.label`
    display: block;
    width: 100%;
    margin-bottom: 0.25rem;
`;

const Input = styled.input`
    display: block;
    width: 100%;
    margin-bottom: 0.25rem;
    border: 1px solid #a1a1a1;
    font: inherit;
    border-radius: 2px;

    &:focus {
        outline-color: #00695c;
    }
`;

export default AddItem;
