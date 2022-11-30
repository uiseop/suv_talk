import { styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IPost } from "../@types/post";
import { IUserContext } from "../@types/user";
import { backInstance } from "../axios";
import { UserContext } from "../Context/UserContext";
import Post from "./Post";
import Share from "./Share";

const Feed = ({ username }: { username?: string }) => {
    const { user } = useContext(UserContext) as IUserContext;
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const {
                data: { posts },
            } = username
                ? await backInstance.get(`/post/profile/${username}`)
                : await backInstance.get(`post/timeline/${user?._id}`);
            setPosts(posts);
        };
        fetchPosts();
    }, [user!._id, username]);
    return (
        <FeedContainer>
            <FeedWrapper>
                {!username || username === user?.username ? <Share /> : ""}
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
