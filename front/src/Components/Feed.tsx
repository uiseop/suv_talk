import { styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";
import Share from "./Share";

interface IPost {
    createdAt: string;
    desc: string;
    likes: string[];
    updatedAt: string;
    userId: string;
    __v: number;
    _id: string;
}

const Feed = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const {
                data: { posts },
            } = await axios.get("/post/timeline/6380be224c46ee0b15e7f394");
            setPosts(posts);
            console.log(posts)
        };
        fetchPosts();
    }, []);
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
