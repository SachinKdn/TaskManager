import React from 'react'
import Layout from '.';
import { Paper, Typography, Box, Grid, Chip, List, ListItem, ListItemText } from '@mui/material';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { useDispatch } from 'react-redux';
import { ITask } from '../pages/login';
import TaskCard from './taskCard';

const InProgressTasks = () => {
    const tasks  = useSelector((state: RootState) => state.users.tasks) as ITask[];
  return (
    <Layout>
    <Box>
    <Typography variant="h5" sx={{
                                fontWeight: 700,
                                fontFamily: "Poppins",
                                fontSize: "1.7rem",
                                color: "#161d2f"
                            }} gutterBottom>
          In-Progress Tasks
        </Typography>
        <Box sx={{
          
        }}>
        {tasks.filter((task)=> task.stage === "IN PROGRESS").length !== 0 ? (tasks.filter((task)=> task.stage === "IN PROGRESS").map((task, index) => (
              <TaskCard index={index} task = {task}/>
            )
        )): (<div>
                    <Typography variant="h5" sx={{
                                fontWeight: 500,
                                fontFamily: "Poppins",
                                fontSize: "1.2rem",
                                color: "white",
                                textAlign: "center"
                            }} gutterBottom>
          There is no any task.
        </Typography>
            
        </div>)}
        </Box>
    </Box>
  </Layout>
  )
}

export default InProgressTasks