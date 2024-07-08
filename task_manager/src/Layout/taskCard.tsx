import React from 'react'
import { Paper, Typography, Box, Grid, Chip, List, ListItem, ListItemText, Button } from '@mui/material';
import { ITask } from '../pages/login';

interface TaskCardProps {
    task: ITask;
    index: number;
  }
const TaskCard : React.FC<TaskCardProps> = ({ index, task}) => {
  return (
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
                    <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" >
                      Update Profile
                    </Button>
      </Box>
              </div>
  )
}

export default TaskCard