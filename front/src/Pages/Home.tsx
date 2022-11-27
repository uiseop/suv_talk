import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { styled } from "@mui/material";

const Home = () => {
    return (
        <TopbarContainer>
            <TopbarLeft>
                <Logo>Suv:DEV</Logo>
            </TopbarLeft>

            <TopbarCenter>
                <Searchbar>
                    <SearchIcon />
                    <SearchInput
                        placeholder="검색어를 입력해주세요"
                        className="searchInput"
                    />
                </Searchbar>
            </TopbarCenter>

            <TopbarRight>
                <div className="topbarLinks">
                    <TopbarLink>Homepage</TopbarLink>
                    <TopbarLink>Timeline</TopbarLink>
                </div>
                <TopbarIcons>
                    <TopbarIconItem>
                        <Person />
                        <TopbarIconBadge>1</TopbarIconBadge>
                    </TopbarIconItem>
                    <TopbarIconItem>
                        <Chat />
                        <TopbarIconBadge>2</TopbarIconBadge>
                    </TopbarIconItem>
                    <TopbarIconItem>
                        <Notifications />
                        <TopbarIconBadge>3</TopbarIconBadge>
                    </TopbarIconItem>
                </TopbarIcons>
                <TopbarImg
                    src="/assets/person/1.jpeg"
                    alt="person"
                    className="topbarImg"
                />
            </TopbarRight>
        </TopbarContainer>
    );
};

const TopbarContainer = styled("div")({
    height: "50px",
    width: "100%",
    backgroundColor: "#1877f2",
    display: "flex",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 999,
});

const TopbarLeft = styled("div")({
    flex: 3,
});

const Logo = styled("span")({
    fontSize: "24px",
    marginLeft: "20px",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
});

const TopbarCenter = styled("div")({
    flex: 5,
});

const Searchbar = styled("div")({
    width: "100%",
    height: "30px",
    backgroundColor: "white",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
});

const SearchIcon = styled(Search)({
    fontSize: "20px !important",
    marginLeft: "10px",
});

const SearchInput = styled("input")({
    border: "none",
    width: "70%",
    "&:focus": {
        outline: "none",
    },
});

const TopbarRight = styled("div")({
    flex: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    color: "white",
});

const TopbarLink = styled("span")({
    marginRight: "10px",
    fontSize: "14px",
    cursor: "pointer",
    "@media (max-width: 768px)": {
        display: "none",
    },
});

const TopbarIcons = styled("div")({
    display: "flex",
});

const TopbarIconItem = styled("div")({
    marginRight: "15px",
    cursor: "pointer",
    position: "relative",
});

const TopbarIconBadge = styled("span")({
    width: "15px",
    height: "15px",
    backgroundColor: "red",
    borderRadius: "50%",
    color: "white",
    position: "absolute",
    top: "-5px",
    right: "-5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
});

const TopbarImg = styled("img")({
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
});

export default Home;
