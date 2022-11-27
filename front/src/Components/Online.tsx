import { styled } from "@mui/material";

const Online = () => {
    return (
        <FriendItem>
            <ProfileImgContainer>
                <ProfileImg
                    src="/assets/person/noAvatar.png"
                    alt="유저 이미지"
                />
                <IsOnlineBadge />
            </ProfileImgContainer>
            <UsernameText>행복한 유저</UsernameText>
        </FriendItem>
    );
};

export default Online;

const FriendItem = styled("li")({
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
});

const ProfileImgContainer = styled("div")({
    marginRight: "10px",
    position: "relative",
});

const ProfileImg = styled("img")({
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
});

const IsOnlineBadge = styled("span")({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "limegreen",
    position: "absolute",
    top: "-2px",
    right: 0,
    border: "2px solid white",
});

const UsernameText = styled("span")({
    fontWeight: 500,
});
