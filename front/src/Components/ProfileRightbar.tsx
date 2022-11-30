import { styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IFriend, IUser, IUserContext } from "../@types/user";
import { backInstance } from "../axios";
import { UserContext } from "../Context/UserContext";

const ProfileRightbar = ({ user }: { user: IUser }) => {
    const { user: currentUser, dispatch } = useContext(
        UserContext
    ) as IUserContext;
    const [isFollowed, setIsFollowed] = useState(
        currentUser!.followings.includes(user._id)
    );
    const [friends, setFriends] = useState<IFriend[]>([]);

    useEffect(() => {
        const getFreinds = async () => {
            try {
                const {
                    data: { friendList },
                } = await backInstance.get(`/user/friends/${user?._id}`);
                console.log(friendList);
                setFriends(friendList);
            } catch (error) {
                console.log(error);
            }
        };
        getFreinds();
    }, [user]);

    return (
        <>
            {user?._id !== currentUser?._id ? (
                <RightbarFollowButton>
                    {isFollowed ? "Unfollow" : "Follow"}
                </RightbarFollowButton>
            ) : (
                ""
            )}

            <RightbarTitle>{user.username}님의 정보</RightbarTitle>
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
            <RightbarTitle>{user.username}님의 팔로우 목록</RightbarTitle>
            <RightbarFollowings>
                {friends.map((friend) => (
                    <Link
                        to={`/profile/${friend.username}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <RightbarFollowing key={friend.id}>
                            <RightbarFollowingImg
                                src={
                                    friend.profileImage ||
                                    "/assets/person/noAvatar.png"
                                }
                                alt="팔로워 이미지"
                            />
                            <span>{friend.username}</span>
                        </RightbarFollowing>
                    </Link>
                ))}
            </RightbarFollowings>
        </>
    );
};

export default ProfileRightbar;

const RightbarTitle = styled("h4")({
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "10px",
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
