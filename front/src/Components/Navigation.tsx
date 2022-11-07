import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
    return (
        <Header>
            <Nav>
                <ItemLists>
                    <Item>
                        <NavLink to={"/"}>Home</NavLink>
                    </Item>
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
