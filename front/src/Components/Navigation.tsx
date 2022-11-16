import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../App";

const Navigation = () => {
    const { user } = useContext(UserContext);
    return (
        <Header>
            <Nav>
                <ItemLists>
                    <Item>
                        <NavLink to={"/"}>Home</NavLink>
                    </Item>
                    <Item>
                        <NavLink to={"/add-product"}>등록하기</NavLink>
                    </Item>
                    <Item>
                        <NavLink to={"/chattings"}>채팅</NavLink>
                    </Item>
                </ItemLists>
                <ItemLists>
                    {user.id ? (
                        <Item>
                            <NavLink to={"/myinfo"}>{user.nickname}</NavLink>
                        </Item>
                    ) : (
                        <Item>
                            <NavLink to={"/login"}>로그인</NavLink>
                        </Item>
                    )}
                </ItemLists>
            </Nav>
        </Header>
    );
};

const Header = styled.header`
    width: 100%;
    height: 3.5rem;
    background-color: #00695c;
    padding: 0 1.5rem;
`;

const Nav = styled.nav`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ItemLists = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
`;

const Item = styled.li`
    margin: 0 1rem;
    padding: 0;

    & a {
        text-decoration: none;
        color: white;

        &:active,
        &:hover,
        &.active {
            color: #ffeb3b;
        }
    }
`;

export default Navigation;
