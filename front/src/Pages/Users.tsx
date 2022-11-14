import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import { Button, Card, Grid } from "../Common/Common";
import Title from "../Components/Title";

interface IUser {
    createdAt: string;
    id: number;
    uid: string;
    updatedAt: string;
}

const Items = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const { user } = useContext(UserContext);
    useEffect(() => {
        axios
            .get("/user/all")
            .then((res) => {
                const { data: users } = res;
                setUsers(users.users);
            })
            .catch((err) => console.log(err));
    }, []);

    const onClickHandler = (otherUser: IUser) => {
        const { uid, id } = otherUser;
        if (uid === user) {
            axios.post("/chat");
        } else {
            axios.post("/chat");
        }
    };

    return (
        <>
            <Title>목록</Title>
            {users.length > 0 ? (
                <Wrapper>
                    {users.map((user) => (
                        <Article key={user.id}>
                            <Header>
                                <h1>{user.uid}</h1>
                            </Header>
                            <CardImage>
                                <img alt={user.id.toString()} />
                            </CardImage>
                            <div>
                                <h2>createdAt: {user.createdAt}</h2>
                                <p>updatedAt: {user.updatedAt}</p>
                            </div>
                            <CardActions>
                                <Button
                                    onClick={(e) => onClickHandler(user)}
                                    disabled={false}
                                >
                                    채팅 시작하기
                                </Button>
                            </CardActions>
                        </Article>
                    ))}
                </Wrapper>
            ) : (
                <Header>No Users Found!</Header>
            )}
        </>
    );
};

const Wrapper = styled.div`
    ${Grid}
`;

const Article = styled.article`
    ${Card}
    width: 20rem;
    max-width: 95%;
`;

const Header = styled.header`
    padding: 1rem;

    & h1 {
        font-size: 1.2rem;
        text-align: center;
    }
`;

const CardImage = styled.div`
    width: 100%;
`;

const CardActions = styled.div`
    padding: 1rem;
    text-align: center;
`;

export default Items;
