import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { useGetMyTasksMutation } from '../redux/api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { useDispatch } from 'react-redux';
import { setLoading, setTasks } from '../redux/reducer'
import { AppDispatch } from "../redux/store";
import { useNavigate } from 'react-router-dom';
import { ITask, IUser } from '../pages/login';
import Board from "../DnD/Board";


// const Home = () => {
//   return 
  
//     // <div>login</div>
//     <Layout><div>login</div></Layout>
//     // <Layout>Home</Layout>
  
// //   <Box>
// //     <Typography variant="h6">Homepage</Typography>
// //   </Box>;
// };
const Home = ()=>{
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user  = useSelector((state: RootState) => state.auth.user) as IUser;
    const tasks = useSelector((state: RootState) => state.users.tasks) as ITask[];
    // const [tasks, setTasks] = useState<ITask[]>([])
    const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
    const [getMyTasks, {data,error,isLoading}] = useGetMyTasksMutation();
    useEffect(()=>{
        if (isAuthenticated) {
            if(user.role === "ADMIN" ) {
              console.log("Logged Effect by ADMIN")
              navigate('/admin');
            }
            const fetchTasks = async ()=>{
                dispatch(setLoading({loading : true}));
                const result = await getMyTasks(0);
                // setTasks(result.data.data);
                  console.log(result.data.data);
                  dispatch(setTasks({tasks: result.data.data}));
                  dispatch(setLoading({loading : false}));
              }
              fetchTasks();
        }
      },[isAuthenticated,navigate])
    return (
    <Layout>
      {tasks.length !== 0 && <Board tasks={tasks}/> }
        <div style={{border: "2px solid black"}}>
          
        </div>
        </Layout>
    )
}

export default Home;