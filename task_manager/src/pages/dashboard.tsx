import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { useGetAllUserQuery, useGetAllUsersMutation } from "../redux/api";
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { IUser } from './login';
import { setIsLoading, setUsers } from '../redux/reducer'
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./dashboard.css"

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import PerformanceChart from './PerformanceChart';

ChartJS.register(ArcElement, Tooltip, Legend);


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
  const data1 = {
    labels: ['Admin', 'Users', 'InActive Users'],
    datasets: [
      {
        label: 'Registered',
        data: [users && users.filter(user => user.role === 'ADMIN').length, users && users.filter(user => user.role === 'USER').length,users && users.filter(user => !user.isActive).length],
        backgroundColor: [
          'rgb(255, 110, 110)',
          'rgba(70, 117, 218, 0.932)',
          'rgb(97 24 24)',
        ],
        borderColor: [
          'rgb(255, 110, 110)',
          'rgba(70, 117, 218, 0.932)',
          'rgb(97 24 24)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };
  interface ITask {
    _id: string;
    title: string;
    desc: string;
    priority: string;
    stage: string;
    estTime: number;
    startTime: string; // ISO date string
    endTime: string; // ISO date string
    assignedTo: string;
  }
  
  interface IUser1 {
    _id: string;
    name: string;
    email: string;
  }
  
  const tasks1: ITask[] = [
    {
      _id: '1',
      title: 'Task 1',
      desc: 'Description 1',
      priority: 'High',
      stage: 'Completed',
      estTime: 5,
      startTime: '2024-07-15T08:00:00Z',
      endTime: '2024-07-15T12:00:00Z',
      assignedTo: 'user1',
    },
    {
      _id: '2',
      title: 'Task 2',
      desc: 'Description 2',
      priority: 'Medium',
      stage: 'Completed',
      estTime: 3,
      startTime: '2024-07-15T09:00:00Z',
      endTime: '2024-07-15T11:00:00Z',
      assignedTo: 'user2',
    },
  ];
  
  const users1: IUser1[] = [
    { _id: 'user1', name: 'User 1', email: 'user1@example.com' },
    { _id: 'user2', name: 'User 2', email: 'user2@example.com' },
  ];
  
    
    
  interface IPerformance {
    userId: string;
    userName: string;
    tasks: number;
    totalEstTime: number;
    totalActualTime: number;
  }
    const calculatePerformance = (tasks: ITask[], users: IUser1[]): IPerformance[] => {
      const performanceMap: { [key: string]: IPerformance } = {};
    
      users.forEach(user => {
        performanceMap[user._id] = {
          userId: user._id,
          userName: user.name,
          tasks: 0,
          totalEstTime: 0,
          totalActualTime: 0,
        };
      });
    
      tasks.forEach(task => {
        const userPerformance = performanceMap[task.assignedTo];
        if (userPerformance) {
          userPerformance.tasks += 1;
          userPerformance.totalEstTime += task.estTime;
    
          const startTime = new Date(task.startTime).getTime();
          const endTime = new Date(task.endTime).getTime();
          const actualTime = (endTime - startTime) / (1000 * 60 * 60); // Convert to hours
    
          userPerformance.totalActualTime += actualTime;
        }
      });
    
      return Object.values(performanceMap);
    };
    const performanceData = calculatePerformance(tasks1, users1);
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
            <Box sx={{
              width:"25vw",
              margin:"auto",
              display:"flex",
              flexDirection:"column",
              alignItems:"center"
            }}>
            <Pie data={data1} options={options} />
            <div><Typography variant="body2" sx={{
                    
                    fontWeight: "500 !important",
                    fontFamily: "Poppins !important",
                            fontSize: "0.7rem !important",
                            color: "#161d2f !important",
                            backgrounColor:"unset !important",
                            marginTop:"10px"
                }}>Pie-Chart about Admin/Users/InAcctive accounts</Typography></div>
            </Box>
        </div>
      </div>
      }
      {/* <PerformanceChart data={performanceData} /> */}
    </Layout>
  )
}

export default DashboardAdmin