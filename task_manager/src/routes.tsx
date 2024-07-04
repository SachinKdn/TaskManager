import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/homepage"
import Error from "./pages/error";
import Login from "./pages/login";
import Profile from "./pages/profile";
import InviteUser from "./pages/inviteUser";
import SignUp from "./pages/signup";
import DashboardAdmin from "./pages/dashboard";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
        errorElement:<Error/>
    },
    {
        path:"/login",
        element:<Login/>,
        errorElement:<Error/>
    },
    {
        path:"/signup",
        element:<SignUp/>,
        errorElement:<Error/>
    },
    {
        path:"/inviteUser",
        element:<InviteUser/>,
        errorElement:<Error/>
    },
    {
        path:"/profile",
        element:<Profile/>,
        errorElement:<Error/>
    },
    {
        path:"/admin",
        element:<DashboardAdmin/>,
        errorElement:<Error/>
    },
    {
        path:"/*",
        element:<Error/>
    },

])