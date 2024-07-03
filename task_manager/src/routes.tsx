import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/homepage"
import Error from "./pages/error";
import Login from "./pages/login";
import Profile from "./pages/profile";
import InviteUser from "./pages/inviteUser";

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
        path:"/inviteUser",
        element:<InviteUser/>,
        errorElement:<Error/>
    },
    {
        path:"/profile",
        element:<Profile/>,
        errorElement:<Error/>
    },

])