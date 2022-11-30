import { styled } from "@mui/material";
import { useLocation } from "react-router-dom";
import { IUser } from "../@types/user";
import Online from "./Online";
import ProfileRightbar from "./ProfileRightbar";

const Rightbar = ({ user }: { user?: IUser }) => {
    const { pathname } = useLocation();

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

    
    return (
        <RightbarContainer>
            <RightbarWrapper>
                {pathname.includes("profile") ? (
                    <ProfileRightbar user={user!} />
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

