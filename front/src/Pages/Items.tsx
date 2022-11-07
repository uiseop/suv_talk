import styled from "styled-components";
import { Button, Card, Grid } from "../Common/Common";

const Items = () => {
    const prouducts: { title: string }[] = [
        { title: "콩쥐와 팥쥐" },
        { title: "콩쥐와 팥쥐" },
        { title: "콩쥐와 팥쥐" },
        { title: "콩쥐와 팥쥐" },
        { title: "콩쥐와 팥쥐" },
    ];
    return (
        <>
            {prouducts.length > 0 ? (
                <Wrapper>
                    {prouducts.map((product) => (
                        <Article>
                            <Header>
                                <h1>{product.title}</h1>
                            </Header>
                            <CardImage>
                                <img alt="A Book" />
                            </CardImage>
                            <div>
                                <h2>$19.99</h2>
                                <p>
                                    A very interesting book about so many even
                                    more interesting things!
                                </p>
                            </div>
                            <CardActions>
                                <Button>Add to Cart</Button>
                            </CardActions>
                        </Article>
                    ))}
                </Wrapper>
            ) : (
                <Header>No Products Found!</Header>
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
