import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Avatar, Paper, Grid } from '@mui/material';
import Layout from '../Layout';
import { ITask, IUser } from './login';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TodoTasks from '../Layout/todoTasks';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ArcElement, Tooltip, Legend
  // , ChartDataLabels
);



const exampleData = {
  labels: ['ToDo Tasks', 'In Progress Tasks', 'Completed Tasks'],
  datasets: [
    {
      label: '# of Votes',
      data: [TodoTasks, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      // borderColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      // ],
      borderWidth: 1,
    },
  ],
};
const exampleDataTemplate: ChartData<'doughnut'> = {
  labels: ['ToDo Tasks', 'In Progress Tasks', 'Completed Tasks'],
  datasets: [
    {
      label: '#currently',
      data: [0, 0, 0], // initial empty data
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
const options: ChartOptions<'doughnut'> = {
  plugins: {
    datalabels: {
      color: '#000',
      font: {
        weight: 'bold',
        size: 16,
      },
      formatter: (value: number) => value,
    },
    legend: {
      display: true,
    },
    tooltip: {
      enabled: true,
    },
  },
  maintainAspectRatio: false,
  responsive: true,
};
const Profile: React.FC = () => {
  
  const [exampleData, setExampleData] = useState(exampleDataTemplate);
  const user  = useSelector((state: RootState) => state.auth.user) as IUser;
  const tasks = useSelector((state: RootState) => state.users.tasks) as ITask[];
  useEffect(() => {
    const todoTasks = tasks.filter((task) => task.stage === "TODO").length;
    const inProgressTasks = tasks.filter((task) => task.stage === "IN PROGRESS").length;
    const completedTasks = tasks.filter((task) => task.stage === "COMPLETED").length;

    setExampleData({
      ...exampleDataTemplate,
      datasets: [
        {
          ...exampleDataTemplate.datasets[0],
          data: [todoTasks, inProgressTasks, completedTasks],
        },
      ],
    });
  }, [tasks]);
  
  return (

    <Layout>
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item sx={{
          width: "25%"
        }}>
          <Avatar alt={user.name} src="https://joesch.moe/api/v1/random" sx={{ width: 100, height: 100 , margin: "auto"}} />
        </Grid>
        <Grid item xs>
          <Typography variant="h5" sx={{
                                fontWeight: 500,
                                fontFamily: "Poppins",
                                fontSize: "1.5rem",
                                color: "#161d2f"
                            }}>{user.name}</Typography>
          <Typography variant="body1" sx={{fontFamily: "Poppins",fontSize:"0.9rem",color: "#003210", margin: "0 auto"}}>{user.email}</Typography>
          <Typography variant="body1" sx={{
            fontWeight: "500",
            fontFamily: "Poppins",
                    fontSize: "1rem",
                    color: "#2a6c11"
          }}>{user.role === 'ADMIN' ? 'Administrator' : 'Simple User'}</Typography>
        </Grid>
      </Grid>
      {user.role === "USER" && tasks.length !== 0 && (<Box mt={2} display="flex" justifyContent="center" sx={{height:"350px"}}>
      <Doughnut data={exampleData} 
      // options={options}
      />
      </Box>)}
    </Paper>
    </Layout>
  );
};

export default Profile;
