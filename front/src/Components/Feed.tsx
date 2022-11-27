import { styled } from "@mui/material";
import Post from "./Post";
import Share from "./Share";

const Feed = () => {
    return (
        <FeedContainer>
            <FeedWrapper>
                <Share />
                <Post />
            </FeedWrapper>
        </FeedContainer>
    );
};

export default Feed;

const FeedContainer = styled("div")({
    flex: 5.5,
});

const FeedWrapper = styled("div")({
    padding: "20px",
});
