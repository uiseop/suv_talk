import { MoreVert } from "@mui/icons-material";
import { styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import timeago from "../util/timeago";

interface IPost {
    createdAt: string;
    desc: string;
    likes: string[];
    updatedAt: string;
    userId: string;
    __v: number;
    _id: string;
}

interface IUser {
    coverImage: string;
    createdAt: string;
    followers: string[];
    followings: string[];
    isAdmin: boolean;
    profileImage: string;
    username: string;
    __v: number;
    _id: string;
}

const Post = ({ post }: { post: IPost }) => {
    const [user, setUser] = useState<IUser>();
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { others },
            } = await axios.get(`/user/${post.userId}`);
            setUser(others);
        };
        fetchUser();
    }, [post.userId]);

    const handleLike = async () => {
        try {
            await axios.put(`/post/${post._id}/like`, {
                userId: user!._id,
            });
            setLike(isLiked ? like - 1 : like + 1);
            setIsLiked((cur) => !cur);
        } catch (error) {}
    };
    return (
        <PostContainer>
            <PostWrapper>
                <PostTop>
                    <PostTopLeft>
                        <Link to={`/profile/${user?.username}`}>
                            <PostProfileImg
                                src={
                                    user?.coverImage ||
                                    "/assets/person/noAvatar.png"
                                }
                            />
                        </Link>
                        <PostUsername>{user?.username}</PostUsername>
                        <PostDate>{timeago(post.createdAt)}</PostDate>
                    </PostTopLeft>
                    <div>
                        <MoreVert />
                    </div>
                </PostTop>
                <PostCenter>
                    <span>{post.desc}</span>
                    <PostImg alt="post Image" />
                </PostCenter>
                <PostBottom>
                    <PostBottomLeft>
                        <LikeIcon onClick={handleLike} src="/assets/like.png" />
                        <LikeIcon
                            onClick={handleLike}
                            src="/assets/heart.png"
                        />
                        <PostLikeCounter>
                            {like}명의 사람들이 좋아합니다
                        </PostLikeCounter>
                    </PostBottomLeft>
                    <div>
                        <PostCommentText>30개의 댓글</PostCommentText>
                    </div>
                </PostBottom>
            </PostWrapper>
        </PostContainer>
    );
};

export default Post;

const PostContainer = styled("div")({
    width: "100%",
    borderRadius: "10px",
    WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    margin: "30px 0",
});

const PostWrapper = styled("div")({
    padding: "10px",
});

const PostTop = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

const PostTopLeft = styled("div")({
    display: "flex",
    alignItems: "center",
});

const PostProfileImg = styled("img")({
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    objectFit: "cover",
});

const PostUsername = styled("span")({
    fontSize: "15px",
    fontWeight: 500,
    margin: "0 10px",
});

const PostDate = styled("span")({
    fontSize: "12px",
});

const PostCenter = styled("div")({
    margin: "20px 0",
});

const PostImg = styled("img")({
    marginTop: "20px",
    width: "100%",
    maxHeight: "500px",
    objectFit: "contain",
});

const PostBottom = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

const PostBottomLeft = styled("div")({
    display: "flex",
    alignItems: "center",
});

const LikeIcon = styled("img")({
    width: "24px",
    height: "24px",
    marginRight: "5px",
    cursor: "pointer",
});

const PostLikeCounter = styled("span")({
    fontSize: "15px",
});

const PostCommentText = styled("span")({
    cursor: "pointer",
    borderBottom: "1px dashed gray",
    fontSize: "15px",
});
