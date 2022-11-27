import { styled } from "@mui/material";
import Feed from "../Components/Feed";
import Rightbar from "../Components/Rightbar";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

const Profile = () => {
    return (
        <>
            <Topbar />
            <ProfileContainer>
                <Sidebar />
                <ProfileRight>
                    <div>
                        <ProfileCover>
                            <ProfileCoverImg
                                src="/assets/person/noCover.png"
                                alt="cover image"
                            />
                            <ProfileUserImg
                                src="/assets/person/noAvatar.png"
                                alt="default image"
                            />
                        </ProfileCover>
                        <ProfileInfo>
                            <ProfileInfoName>유저 아이디</ProfileInfoName>
                            <ProfileInfoDesc>유저 설명</ProfileInfoDesc>
                        </ProfileInfo>
                    </div>
                    <ProfileRightBottom>
                        <Feed />
                        <Rightbar />
                    </ProfileRightBottom>
                </ProfileRight>
            </ProfileContainer>
        </>
    );
};

export default Profile;

const ProfileContainer = styled("div")({
    display: "flex",
});

const ProfileRight = styled("div")({
    flex: 9,
});

const ProfileCover = styled("div")({
    height: "320px",
    position: "relative",
});

const ProfileCoverImg = styled("img")({
    width: "100%",
    height: "250px",
    objectFit: "cover",
});

const ProfileUserImg = styled("img")({
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
    left: 0,
    right: 0,
    margin: "auto",
    top: "150px",
    border: "3px solid white",
});

const ProfileInfo = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});

const ProfileInfoName = styled("h4")({
    fontSize: "24px",
});

const ProfileInfoDesc = styled("span")({
    fontWeight: 300,
});

const ProfileRightBottom = styled("div")({
    display: "flex",
});
