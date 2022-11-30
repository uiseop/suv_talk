import { styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IPost } from "../@types/post";
import { IUserContext } from "../@types/user";
import { backInstance } from "../axios";
import { UserContext } from "../Context/UserContext";
import Post from "./Post";
import Share from "./Share";

const Feed = () => {
    const { user } = useContext(UserContext) as IUserContext;
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const {
                data: { posts },
            } = await backInstance.get("/post/timeline/all", {
                params: { userId: user!._id },
            });
            setPosts(posts);
        };
        fetchPosts();
    }, [user!._id]);
    return (
        <FeedContainer>
            <FeedWrapper>
                <Share />
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
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
