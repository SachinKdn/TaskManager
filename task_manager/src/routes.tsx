import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/homepage"
import Error from "./pages/error";
import Login from "./pages/login";
import ResetPassword from "./pages/resetPassword";
import Profile from "./pages/profile";
import InviteUser from "./pages/inviteUser";
import SignUp from "./pages/signup";
import DashboardAdmin from "./pages/dashboard";
import AssignTask from "./pages/assignTask";
import UserDetails from "./Layout/userDetails";
import AllUsers from "./pages/allUsers";
import CompletedTasks from "./Layout/completedTasks";
import InProgressTasks from "./Layout/inProgressTasks";
import TodoTasks from "./Layout/todoTasks";

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
        path:"/set-new-password",
        element:<ResetPassword/>,
        errorElement:<Error/>
    },
    {
        path:"/addtask",
        element:<AssignTask/>,
        errorElement:<Error/>
    },
    {
        path:"/inviteUser",
        element:<InviteUser/>,
        errorElement:<Error/>
    },
    {
        path:"/users",
        element:<AllUsers/>,
        errorElement:<Error/>
    },
    {
        path:"/completed",
        element:<CompletedTasks/>,
        errorElement:<Error/>
    },
    {
        path:"/inprogress",
        element:<InProgressTasks/>,
        errorElement:<Error/>
    },
    {
        path:"/todo",
        element:<TodoTasks/>,
        errorElement:<Error/>
    },
    {
        path:"/users/:id",
        element:<UserDetails/>,
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