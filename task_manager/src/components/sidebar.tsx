import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Hidden, Typography } from "@mui/material";

import TaskIcon from '@mui/icons-material/Task';
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';

import React from "react";
import { useDispatch } from 'react-redux';
import { setLoading, setTokens, resetTokens ,setUser } from '../redux/reducer'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AppDispatch } from "../redux/store";
import PersonIcon from '@mui/icons-material/Person';

const navLinks = [
  {
    name: "Home",
    icon: HomeIcon,
    link: "/",
  },
  {
    name: "Dashboard",
    icon: DashboardIcon,
    link: "/admin",
  },
  {
    name: "My Profile",
    icon: PersonIcon,
    link: "/profile",
  },
  {
    name: "Assign Task",
    icon: TaskIcon,
    link: "/addtask",
  },
  {
    name: "Add Task",
    icon: TaskIcon,
    link: "/addTask",
  },
  {
    name: "All Users",
    icon: GroupIcon,
    link: "/users",
  },
  {
    name: "Invite New User",
    icon: PersonAddIcon,
    link: "/inviteUser",
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



export interface IUser {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  isActive: boolean;
  password: string;
  tasks: object[];
  role: string;
}
const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user  = useSelector((state: RootState) => state.auth.user) as IUser;
  const dispatch = useDispatch<AppDispatch>();


  const handleLogout = ()=>{
    console.log("Log Out.....");
    localStorage.clear();
    dispatch(resetTokens());
  }

  React.useEffect(()=>{
    if(!isAuthenticated){
      navigate('/login')
    }
  },[isAuthenticated])

  return (
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
          md: "space-between",
          lg: "start",
        },
        width: {
          sm: "100%",
          md: "100%",
          lg: 250,
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
        {navLinks.map((item) => {
          
          if ((item.name === 'Dashboard' ||  item.name === 'Assign Task' || item.name === 'All Users' || item.name === 'Invite New User') && user.role === "USER" ) {
            return null; 
          }

          if ((item.name === 'Home' ||  item.name === 'Add Task' || item.name === 'Completed' || item.name === 'To Do' || item.name === 'In Progress' ) && user.role === "ADMIN" ) {
            return null; 
          }
           if(item.name === 'Logout'){
            return (
            
              <Link
                key={item.name}
                to={item.link}
                style={{ textDecoration: "none" }}
                onClick={handleLogout}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    color: "white",
                    textDecoration: "none",
                  }}>
                  <item.icon />
                  <Hidden mdDown>
                    <Typography variant="h5"
                      component="h6"
                      fontWeight={400}
                      fontSize={15}>{item.name}</Typography>
                  </Hidden>
                </Box>
              </Link>
            )
           }
          return (
            
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
              }}>
              <item.icon />
              <Hidden mdDown>
                <Typography variant="h5"
                  component="h6"
                  fontWeight={400}
                  fontSize={15}>{item.name}</Typography>
              </Hidden>
            </Box>
          </Link>
        )})}
      </Box>
    </Box>
  )
}



export default Sidebar;