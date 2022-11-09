import { useCallback } from "react";
import styled from "styled-components";
import { Button } from "../Common/Common";
import Title from "../Components/Title";

const AddItem = () => {
    const submitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }, []);

    return (
        <>
            <Title>추가하기</Title>
            <ProductForm onSubmit={submitHandler}>
                <div>
                    <Label>Title</Label>
                    <Input />
                </div>
                <Button type="submit">Add Product</Button>
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
