import React from 'react'
import Layout from '.';
import { Paper, Typography, Box, Grid, Chip, List, ListItem, ListItemText } from '@mui/material';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { useDispatch } from 'react-redux';
import { ITask } from '../pages/login';
import TaskCard from './taskCard';

const TodoTasks = () => {
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
          TODO Tasks
        </Typography>
        <Box sx={{
          
        }}>
        {tasks ? (tasks.filter((task)=> task.stage === "TODO").map((task, index) => (
              <TaskCard index={index} task = {task}/>
            )
        )): (<div>
                    <Typography variant="h5" sx={{
                                fontWeight: 700,
                                fontFamily: "Poppins",
                                fontSize: "1.7rem",
                                color: "#161d2f"
                            }} gutterBottom>
          There no any task.
        </Typography>
            
        </div>)}
        </Box>
    </Box>
  </Layout>
  )
}

export default TodoTasks