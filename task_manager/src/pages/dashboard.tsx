import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { useGetAllUserQuery, useGetAllUsersMutation } from "../redux/api";
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { IUser } from './login';
import { setIsLoading, setUsers } from '../redux/reducer'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./dashboard.css"

const DashboardAdmin = () => {
  const  { data, error, isLoading } = useGetAllUserQuery("");
  console.log({ data, error, isLoading })
  console.log(data?.length)
  const dispatch = useDispatch<AppDispatch>();
  const [users, setAllUsersState] = useState<IUser[]>([]);
  useEffect(() => {
    dispatch(setIsLoading({loading : true}));
    if (!isLoading && data) {
      console.log("Fetching over");
      setAllUsersState(data);
      dispatch(setUsers({users: data }))
      dispatch(setIsLoading({loading : false}));
    }
  }, [isLoading, data]);
  // if(!isLoading){
  //   const result = data;
  //   // const result = await getAllUsers(1); // Assuming getAllUsers action creator is correctly configured
  //   // setAllUsersState(result.data)
  //   console.log(result);
  // }
  // useEffect(() => {
    // dispatch(setIsLoading({loading : true}));
    
    
    // const fetchData = async () => {
    //   try {
    //     const result = data;
    //     // const result = await getAllUsers(1); // Assuming getAllUsers action creator is correctly configured
    //     setAllUsersState(result.data)
    //     console.log(result);
    //     dispatch(setUsers({users: result.data.data }))
    //     dispatch(setIsLoading({loading : false}));
    //   } catch (error) {
    //     console.error('Error fetching users:', error);
    //   }
    // };
    // fetchData();
  // },[dispatch])

  return (
    <Layout>
      {isLoading ? <div>Loading......</div> : 
     <div className="dashboardContainer">
        <Typography component="h1" sx={{
          color: "rgba(0, 0, 0, 0.733)",
          font: "700 2rem Roboto",
          textAlign: "center",
          width: "50%",
          padding: "1.5rem",
          margin: "auto",
        }}>Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total users registered<br /> {users.length}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <div >
              <p>Admins</p>
              <p>{users && users.filter(user => user.role === 'ADMIN').length}</p>
            </div>
            <div >
              <p>Users</p>
              <p>{users && users.filter(user => user.role === 'USER').length}</p>
            </div>
            
          </div>
        </div>
      </div>
      }
    </Layout>
  )
}

export default DashboardAdmin