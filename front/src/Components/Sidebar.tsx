import {
    Bookmark,
    Chat,
    Event,
    Group,
    HelpOutline,
    PlayCircleFilledOutlined,
    RssFeed,
    School,
    WorkOutline,
} from "@mui/icons-material";
import { styled } from "@mui/material";

const sx_prop = {
    marginLeft: "15px",
};

const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarWrapper>
                <SidebarList>
                    <SidebarListItem>
                        <RssFeed sx={sx_prop} />
                        <span>Feed</span>
                    </SidebarListItem>
                    <SidebarListItem>
                        <Chat sx={sx_prop} />
                        <span>Chats</span>
                    </SidebarListItem>
                    <SidebarListItem>
                        <PlayCircleFilledOutlined sx={sx_prop} />
                        <span>Videos</span>
                    </SidebarListItem>
                    <SidebarListItem>
                        <Group sx={sx_prop} />
                        <span>Groups</span>
                    </SidebarListItem>
                    <SidebarListItem>
                        <Bookmark sx={sx_prop} />
                        <span>Bookmarks</span>
                    </SidebarListItem>
                    <SidebarListItem>
                        <HelpOutline sx={sx_prop} />
                        <span>Questions</span>
                    </SidebarListItem>
                    <SidebarListItem>
                        <WorkOutline sx={sx_prop} />
                        <span>Jobs</span>
                    </SidebarListItem>
                    <SidebarListItem>
                        <Event sx={sx_prop} />
                        <span>Events</span>
                    </SidebarListItem>
                    <SidebarListItem>
                        <School sx={sx_prop} />
                        <span>Courses</span>
                    </SidebarListItem>
                </SidebarList>
                <SidebarButton>Show More</SidebarButton>
                <SidebarHr />
                <SidebarFriendList></SidebarFriendList>
            </SidebarWrapper>
        </SidebarContainer>
    );
};

const SidebarContainer = styled("div")({
    flex: 3,
    height: "calc(100vh - 50px)",
    overflowY: "scroll",
    position: "sticky",
    top: "50px",

    "&::-webkit-scrollbar": {
        width: "5px",
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgb(179,179,179)",
    },
});

const SidebarWrapper = styled("div")({
    padding: "20px",
});

const SidebarList = styled("ul")({
    padding: 0,
    margin: 0,
    listStyle: "none",
});

const SidebarListItem = styled("li")({
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
});

const SidebarButton = styled("button")({
    widht: "150px",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    fontWeight: 500,
});

const SidebarHr = styled("hr")({
    margin: "20px 0",
});

const SidebarFriendList = styled("ul")({
    padding: 0,
    margin: 0,
    listStyle: "none",
});

export default Sidebar;
