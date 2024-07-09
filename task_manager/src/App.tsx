import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/homepage";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import { useGetMyTasksMutation, useGetAllUsersMutation, useGetAllUserQuery } from './redux/api';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

import { useDispatch } from 'react-redux';
import { setIsLoading, setTasks , setUsers} from './redux/reducer'
import { AppDispatch } from "./redux/store";
import { ITask, IUser } from './pages/login';


function App() {
  console.log("Console from App.tsx")
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user  = useSelector((state: RootState) => state.auth.user) as IUser;
    // const [tasks, setTasks] = useState<ITask[]>([])
    const dispatch = useDispatch<AppDispatch>();
    const [getMyTasks] = useGetMyTasksMutation();
    const [getAllUsers] = useGetAllUsersMutation();
    
    const  { data, error, isLoading } = useGetAllUserQuery("");
    
  useEffect(()=>{

    dispatch(setIsLoading({loading : true}));
    if (isAuthenticated && user.role === "USER") {
      console.log("App effect")
        // if(user.role === "ADMIN" ) {
        //   console.log("Logged Effect by ADMIN")
        //   navigate('/admin');
        // }
        const fetchTasks = async ()=>{
            dispatch(setIsLoading({loading : true}));
            try {
            const result = await getMyTasks(0);
            // setTasks(result.data.data);
            console.log("Tasks Fetched from APP.JS")
              console.log(result.data.data);
              dispatch(setTasks({tasks: result.data.data}));
              dispatch(setIsLoading({loading : false}));
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          };
          fetchTasks();
    }
    if(isAuthenticated && user.role === "ADMIN"){
      if (!isLoading && data) {
        console.log("Fetching over");
        dispatch(setUsers({users: data }))
        dispatch(setIsLoading({loading : false}));
      }
      // const fetchData = async () => {
      //   try {
      //     const result = await getAllUsers(1); // Assuming getAllUsers action creator is correctly configured
      //     console.log(result);
      //     dispatch(setUsers({users: result.data.data }))
      //     dispatch(setIsLoading({loading : false}));
      //   } catch (error) {
      //     console.error('Error fetching users:', error);
      //   }
      // };
      // fetchData();
    }
},[isLoading, data])

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
