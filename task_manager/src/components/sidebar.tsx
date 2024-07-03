import { Link, useLocation } from "react-router-dom";
import { Box, Hidden, Typography } from "@mui/material";

// import TaskIcon from '@mui/icons-material/Task';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
// import CallIcon from '@mui/icons-material/Call';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
//in progress
import PendingIcon from '@mui/icons-material/Pending';
//completed
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
//todo
import ListIcon from '@mui/icons-material/List';



const navLinks = [
    {
      name: "Home",
      icon: HomeIcon,
      link: "/",
    },
    {
        name: "Profile",
        icon: SettingsIcon,
        link: "/profile",
    },
    {
      name: "Completed",
      icon: PlaylistAddCheckIcon,
      link: "/completed",
    },
    {
      name: "In Progress",
      icon: PendingIcon,
      link: "/inprogress",
    },
    {
      name: "To Do",
      icon: ListIcon,
      link: "/todo",
    },
    {
      name: "Logout",
      icon: LogoutIcon,
      link: "/login",
    },
  ];



const Sidebar = ()=>{
    const { pathname } = useLocation();
    return(
        <Box
        sx={{
          backgroundColor: "#161d2f",
          padding: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: {
            xs: "row",
            lg: "column",
          },
          alignItems: "center",
          justifyContent: {
            md : "space-between",
            lg : "start",
        },
          width: {
            sm: "100%",
            md: "100%",
            lg: 200,
          },
          boxSizing: "border-box",
        }}
      >
<Hidden smDown>
          <Typography
            variant="h5"
            component="h1"
            my={2}
            fontWeight={400}
            fontSize={18}
          >
            Task Manager
          </Typography>
        </Hidden>

        <Box
          sx={{
            py: {
              xs: "0px",
              lg: "16px",
            },
            display: "flex",
            flexDirection: {
              xs: "row",
              lg: "column",
            },
            gap: 2,
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {/* <img
                  src={item.icon}
                  alt={item.name}
                  style={{
                    width: "18px",
                    filter: `${
                      pathname === item.link
                        ? "invert(58%) sepia(14%) saturate(3166%) hue-rotate(215deg) brightness(91%) contrast(87%)"
                        : "invert(84%)"
                    }`,
                  }}
                /> */}
                <item.icon/>
                <Hidden mdDown>
                  <Typography variant="h5"
            component="h6"
            fontWeight={400}
            fontSize={15}>{item.name}</Typography>
                </Hidden>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    )
}



export default Sidebar;