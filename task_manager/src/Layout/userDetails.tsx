import React, { useState } from 'react'

import { useLocation } from 'react-router-dom';
import { ITask, IUser } from '../pages/login';
import Layout from '.';
import { Paper, Typography, Box, Grid, Chip, List, ListItem, ListItemText, Button } from '@mui/material';
import "./userDetails.css"
import { useGetUserTaskByIdMutation } from '../redux/api';




const UserDetails = () => {
  const location = useLocation();

  const { user } = location.state as { user : IUser };
  const [getUserTaskById, {data,error,isLoading}] = useGetUserTaskByIdMutation();
  const [tasks, setTasks] = useState<ITask[]>([])
  React.useEffect(()=>{
    const fetchTasks = async ()=>{
    const result = await getUserTaskById(user._id);
    setTasks(result.data.data);
      console.log(result);
  }
  fetchTasks();
  },[])
  return (
    <Layout>

<Box>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{
                                fontWeight: 700,
                                fontFamily: "Poppins",
                                fontSize: "1.7rem",
                                color: "#161d2f"
                            }} gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{fontFamily: "Poppins",fontSize:"0.9rem",color: "#353937", margin: "0 auto"}}>
          Email: {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{fontFamily: "Poppins",fontSize:"0.9rem",color: "#353937", margin: "0 auto"}}>
          Role: {user.role}
        </Typography>
        <Typography className={user.isActive ? "activeClass" : "inActiveClass"} variant="body1" gutterBottom sx={{fontFamily: "Poppins",fontWeight: "500" ,fontSize:"0.9rem",color: "#353937", margin: "0 auto"}}>
          Account Status: {user.isActive ? 'Active' : 'Inactive'}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{fontFamily: "Poppins",fontSize:"0.9rem",color: "#353937", margin: "0 auto"}}>
          Created At: {new Date(user.createdAt).toLocaleDateString()}
        </Typography>
        
        {!isLoading && user.role === "USER" &&  
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Tasks
          </Typography>
          <List>
            {tasks.map((task, index) => (
              <div key={index} className='taskCard'>
                  
                      <Typography variant="h6" sx={{
                                textDecoration: "none",
                                fontWeight: 500,
                                fontFamily: "Poppins",
                                fontSize: "1rem",
                                color: "#161d2f"
                            }}>{task.title}</Typography>
                      <Typography variant="body2" sx={{
                    
                    fontWeight: "500",
                    fontFamily: "Poppins",
                            fontSize: "0.7rem",
                            color: "#161d2f"
                }}>Description: {task.desc}</Typography>
                      <Typography variant="body2" sx={{
                    
                    fontWeight: "500",
                    fontFamily: "Poppins",
                            fontSize: "0.7rem",
                            color: "#161d2f"
                }}> Priority: {task.priority}</Typography>
                      <Typography variant="body2" sx={{
                    
                    fontWeight: "500",
                    fontFamily: "Poppins",
                            fontSize: "0.7rem",
                            color: "#161d2f"
                }}>Stage: {task.stage}</Typography>
                      <Typography variant="body2" sx={{
                    
                    fontWeight: "500",
                    fontFamily: "Poppins",
                            fontSize: "0.7rem",
                            color: "#161d2f"
                }}>Estimated Time: {task.estTime} hours</Typography>
                    
                    <Box display="flex" justifyContent="flex-end" gap={1}
                      sx={{
                        marginTop:{
                          md: "0",
                          lg: "-2"
                        }
                      }}
                    >
                    <Button size="small" variant="outlined" color="error" >
                       Delete Task
                      </Button>
                      <Button size="small" variant="contained" color="primary" >
                        Update Task
                      </Button>
                    </Box>
              </div>
                
            ))}
          </List>
        </Box>
        }
      </Paper>
    </Box>
    </Layout>
  )
}

export default UserDetails