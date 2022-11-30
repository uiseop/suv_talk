import { styled } from "@mui/material";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IUser, IUserContext } from "../@types/user";
import { UserContext } from "../Context/UserContext";
import Online from "./Online";

const Rightbar = ({ user }: { user?: IUser }) => {
    const { pathname } = useLocation();
    const { user: currentUser, dispatch } = useContext(
        UserContext
    ) as IUserContext;

    const HomeRightbar = () => {
        return (
            <>
                <BirthdayConatiner>
                    <BirthdayImg src="/assets/gift.png" alt="gift" />
                    <BirthdayText>
                        <b>행복한 유저</b>와 <b>3명의 다른 친구들</b>이 오늘
                        생일입니다.
                    </BirthdayText>
                </BirthdayConatiner>
                <RightbarAd src="/assets/logo_main.svg" alt="ad" />
                <RightbarTitle>Online Friends</RightbarTitle>
                <RightbarFriendList>
                    <Online />
                </RightbarFriendList>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                {user?._id !== currentUser?._id ? (
                    <RightbarFollowButton>Follow</RightbarFollowButton>
                ) : (
                    ""
                )}

                <RightbarTitle>User Information</RightbarTitle>
                <RightbarInfo>
                    <RightbarInfoItem>
                        <RightbarInfoKey>City:</RightbarInfoKey>
                        <RightbarInfoValue>서울</RightbarInfoValue>
                    </RightbarInfoItem>
                    <RightbarInfoItem>
                        <RightbarInfoKey>From:</RightbarInfoKey>
                        <RightbarInfoValue>동대문</RightbarInfoValue>
                    </RightbarInfoItem>
                </RightbarInfo>
                <RightbarTitle>User Friends</RightbarTitle>
                <RightbarFollowings>
                    <RightbarFollowing>
                        <RightbarFollowingImg
                            src="/assets/person/noAvatar.png"
                            alt="팔로워 이미지"
                        />
                        <span>팔로워 이름</span>
                    </RightbarFollowing>
                </RightbarFollowings>
            </>
        );
    };
    return (
        <RightbarContainer>
            <RightbarWrapper>
                {pathname.includes("profile") ? (
                    <ProfileRightbar />
                ) : (
                    <HomeRightbar />
                )}
            </RightbarWrapper>
        </RightbarContainer>
    );
};

export default Rightbar;

const RightbarContainer = styled("div")({
    flex: 3.5,
});

const RightbarWrapper = styled("div")({
    padding: "20px 20px 0 0 ",
});

const BirthdayConatiner = styled("div")({
    display: "flex",
    alignItems: "center",
});

const BirthdayImg = styled("img")({
    width: "40px",
    height: "40px",
    marginRight: "10px",
});

const BirthdayText = styled("span")({
    fontWeight: 300,
    fontSize: "15px",
});

const RightbarAd = styled("img")({
    width: "100%",
    borderRadius: "10px",
    margin: "30px 0",
});

const RightbarTitle = styled("h4")({
    fontSize: "18px",
    fontWeight: 500,
    marginBottom: "10px",
});

const RightbarFriendList = styled("ul")({
    padding: 0,
    margin: 0,
    listStyle: "none",
});

const RightbarInfo = styled("div")({
    marginBottom: "30px",
});

const RightbarInfoItem = styled("div")({
    marginBottom: "10px",
});

const RightbarInfoKey = styled("span")({
    fontWeight: 500,
    marginRight: "15px",
    color: "#555",
});

const RightbarInfoValue = styled("span")({
    fontWeight: 300,
});

const RightbarFollowings = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
});

const RightbarFollowing = styled("div")({
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    cursor: "pointer",
});

const RightbarFollowingImg = styled("img")({
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "5px",
});

const RightbarFollowButton = styled("button")({
    marginTop: "30px",
    marginBottom: "10px",
    border: "none",
    backgroundColor: "#1872f2",
    color: "white",
    borderRadius: "5px",
    padding: "5px 10px",
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: 500,
    cursor: "pointer",

    "&:focus": {
        outline: "none",
    },
});
