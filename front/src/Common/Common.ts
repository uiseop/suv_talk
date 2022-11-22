import styled, { css } from "styled-components";

const Grid = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
`;

const Card = css`
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;

const Button = styled.button<{ disabled: boolean }>`
    font: inherit;
    border: 1px solid #1877f2;
    color: #1877f2;
    background: white;
    border-radius: 3px;
    cursor: pointer;

    &:hover,
    &:active {
        background-color: #1877f2;
        color: white;
    }
`;

export { Grid, Card, Button };
