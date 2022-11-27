import { MoreVert } from "@mui/icons-material";
import { styled } from "@mui/material";

const Post = () => {
    return (
        <PostContainer>
            <PostWrapper>
                <PostTop>
                    <PostTopLeft>
                        <PostProfileImg src="/assets/person/noAvatar.png" />
                        <PostUsername>Suv</PostUsername>
                        <PostDate>{new Date().toDateString()}</PostDate>
                    </PostTopLeft>
                    <div>
                        <MoreVert />
                    </div>
                </PostTop>
                <PostCenter>
                    <span>Hello</span>
                    <PostImg alt="post Image" />
                </PostCenter>
                <PostBottom>
                    <PostBottomLeft>
                        <LikeIcon src="/assets/like.png" />
                        <LikeIcon src="/assets/heart.png" />
                        <PostLikeCounter>100명의 사람들이 좋아합니다</PostLikeCounter>
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
    "-webkit-box-shadow": "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
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
