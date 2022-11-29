import { Cancel, PermMedia } from "@mui/icons-material";
import { styled } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { IUserContext } from "../@types/user";
import { UserContext } from "../Context/UserContext";

const Share = () => {
    const { user } = useContext(UserContext) as IUserContext;
    const [file, setFile] = useState(null);
    const desc = useRef<HTMLTextAreaElement>(null);
    return (
        <ShareContainer>
            <ShareWrapper>
                <ShareTop>
                    <ShareProfileImg
                        src={
                            user!.profileImage
                                ? user!.profileImage
                                : "/assets/person/noAvatar.png"
                        }
                        alt="default image"
                    />
                    <ShareInput
                        ref={desc}
                        placeholder={`오늘은 어떤 꿈을 꾸셨나요 ${user?.username}님?`}
                    />
                </ShareTop>
                <ShareHr />
                <ShareImageContaier>
                    <ShareImage alt="공유 이미지" />
                    <ShareCancelImg />
                </ShareImageContaier>
                <ShareForm>
                    <ShareOptions>
                        <ShareOption htmlFor="file">
                            <PermMedia htmlColor="tomato" sx={shareIcon} />
                            <ShareOptionText>Photo or Video</ShareOptionText>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png, .jpeg, .jpg"
                            />
                        </ShareOption>
                    </ShareOptions>
                    <ShareButton type="submit">Share</ShareButton>
                </ShareForm>
            </ShareWrapper>
        </ShareContainer>
    );
};

export default Share;

const ShareContainer = styled("div")({
    width: "100%",
    borderRadius: "10px",
    WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
    boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
});

const ShareWrapper = styled("div")({
    padding: "10px",
});

const ShareTop = styled("div")({
    display: "flex",
    alignItems: "center",
});

const ShareProfileImg = styled("img")({
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "10px",
});

const ShareInput = styled("textarea")({
    border: "none",
    width: "80%",
    resize: "none",

    "&:focus": {
        outline: "none",
    },
});

const ShareHr = styled("hr")({
    margin: "20px",
});

const ShareForm = styled("form")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

const ShareOptions = styled("div")({
    display: "flex",
    marginLeft: "20px",
});

const ShareOption = styled("label")({
    display: "flex",
    alignItems: "center",
    marginRight: "15px",
    cursor: "pointer",
});

const shareIcon = {
    fontSize: "18px",
    marginRight: "3px",
};

const ShareOptionText = styled("span")({
    fontSize: "14px",
    fontWeight: 500,
});

const ShareButton = styled("button")({
    border: "none",
    padding: "7px",
    borderRadius: "5px",
    backgroundColor: "green",
    fontWeight: 500,
    marginRight: "20px",
    cursor: "pointer",
    color: "white",
});

const ShareImageContaier = styled("div")({
    padding: "0 20px 10px 20px",
    position: "relative",
});

const ShareImage = styled("img")({
    width: "100%",
    objectFit: "cover",
});

const ShareCancelImg = styled(Cancel)({
    position: "absolute",
    top: 0,
    right: "20px",
    cursor: "pointer",
    opacity: 0.7,
});
