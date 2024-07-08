import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/homepage";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { useGetMyTasksMutation } from './redux/api';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

import { useDispatch } from 'react-redux';
import { setIsLoading, setTasks } from './redux/reducer'
import { AppDispatch } from "./redux/store";
import { ITask, IUser } from './pages/login';


function App() {
  console.log("Console from App.tsx")
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user  = useSelector((state: RootState) => state.auth.user) as IUser;
    // const [tasks, setTasks] = useState<ITask[]>([])
    const dispatch = useDispatch<AppDispatch>();

    const [getMyTasks, {data,error,isLoading}] = useGetMyTasksMutation();

    
  useEffect(()=>{
    if (isAuthenticated && user.role === "USER") {
      console.log("App effect")
        // if(user.role === "ADMIN" ) {
        //   console.log("Logged Effect by ADMIN")
        //   navigate('/admin');
        // }
        const fetchTasks = async ()=>{
            dispatch(setIsLoading({loading : true}));
            const result = await getMyTasks(0);
            // setTasks(result.data.data);
              console.log(result.data.data);
              dispatch(setTasks({tasks: result.data.data}));
              dispatch(setIsLoading({loading : false}));
          }
          fetchTasks();
    }
},[])

  return (
    // <Routes>
    //   <Route element={<Basic />}>
    //     <Route path="/" element={<Home />} />
    //   </Route>
    // </Routes>

    <RouterProvider router={router} />
  );
}

export default App;
