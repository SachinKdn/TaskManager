import React, { useState } from 'react'
import {
  MenuItem,
  TextField,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  FormHelperText,
  Input,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ITask, IUser } from '../pages/login';
import Layout from '.';
import { Paper, Typography, Box, Grid, Chip, List, ListItem, ListItemText, Button } from '@mui/material';
import "./userDetails.css"
import { useDeleteTaskByIDMutation, useGetUserTaskByIdQuery, useUpdateTaskByIDMutation } from '../redux/api';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const UserDetails = () => {
  
  
  const users  = useSelector((state: RootState) => state.users.users) as IUser[];
  const location = useLocation();
  const [deleteTaskByID] = useDeleteTaskByIDMutation();
  const [updateTaskByID] = useUpdateTaskByIDMutation();
  const { user } = location.state as { user: IUser };
  const { data, error, isLoading, refetch } = useGetUserTaskByIdQuery(user._id);
  const [tasks, setTasks] = useState<ITask[]>([])
  React.useEffect(() => {
    //   const fetchTasks = async ()=>{
    //   const result = await getUserTaskById(user._id);
    //   setTasks(result.data.data);
    //     console.log(result);
    // }
    // fetchTasks();
    if (!isLoading && data) {
      console.log("Fetching over");
      setTasks(data.data);
      console.log(data.data)
      // dispatch(setUsers({users: data }))
      // dispatch(setIsLoading({loading : false}));
    }
  }, [isLoading, data])
  
  const [errors, setErrors] = useState({
    title: '',
    // desc: '',
    assignedTo: '',
    estTime: '',
    priority: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setCurrTask({
      ...currTask,
      [name as string]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTaskByID(taskId).unwrap();
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };
  const [open, setOpen] = React.useState(false);
  const [currTask, setCurrTask] = useState<ITask>({
    _id: "",
    title: "",
    desc: "",
    priority: "",
    stage: "",
    estTime: 0,
    assignedTo: ""
  })

  const handleClickOpen = (task : ITask) => {
    setCurrTask({...task});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Typography variant="body1" gutterBottom sx={{ fontFamily: "Poppins", fontSize: "0.9rem", color: "#353937", margin: "0 auto" }}>
            Email: {user.email}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontFamily: "Poppins", fontSize: "0.9rem", color: "#353937", margin: "0 auto" }}>
            Role: {user.role}
          </Typography>
          <Typography className={user.isActive ? "activeClass" : "inActiveClass"} variant="body1" gutterBottom sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "0.9rem", color: "#353937", margin: "0 auto" }}>
            Account Status: {user.isActive ? 'Active' : 'Inactive'}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontFamily: "Poppins", fontSize: "0.9rem", color: "#353937", margin: "0 auto" }}>
            Created At: {new Date(user.createdAt).toLocaleDateString()}
          </Typography>

          {!isLoading && user.role === "USER" &&
            <Box mt={3}>
              <Typography variant="h5" gutterBottom>
                Tasks
              </Typography>
              <List>
                {tasks.length == 0 ? <div>There is no any task yet.</div> : tasks.map((task, index) => (
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
                        marginTop: {
                          md: "0",
                          lg: "-2"
                        }
                      }}
                    >
                      <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteTask(task._id)} >
                        Delete Task
                      </Button>
                      <Button size="small" variant="contained" color="primary" onClick={()=>handleClickOpen(task)}>
                        Update Task
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          component: 'form',
                          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            console.log(formData)
                            const formJson = Object.fromEntries((formData as any).entries());
                            console.log(formJson)
                            
                            try {
                              const updatedTask = await updateTaskByID({ id: currTask._id, credentials: formJson }).unwrap();
                              console.log(updatedTask)
                              refetch(); // Refetch the user data after the task is updated
                              handleClose();
                            } catch (error) {
                              console.error('Failed to update task:', error);
                            }
                          },
                        }}
                      >
                        <DialogTitle>Task Update</DialogTitle>
                        <DialogContent>
                          
                          {/* <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                          /> */}
                          <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={currTask.title}
          onChange={handleChange}
          // error={!!errors.title}
          // helperText={errors.title}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="desc"
          value={currTask.desc}
          onChange={handleChange}
          // error={!!errors.desc}
          // helperText={errors.desc}
        />
       
       <FormControl fullWidth margin="normal" 
       //error={!!errors.assignedTo}
       >
          <InputLabel id="assignedTo-label">Assign To</InputLabel>
          <Select
            labelId="assignedTo-label"
            name="assignedTo"
            label= "Assign To"
            value={currTask.assignedTo}
            onChange={handleChange}
          >
            {users.filter(user => user.isActive && user.role === "USER").map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
          {/* <FormHelperText>{errors.assignedTo}</FormHelperText> */}
        </FormControl>
        <TextField
          label="Estimation Hours"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="estTime"
          value={currTask.estTime}
          onChange={handleChange}
          // error={!!errors.estTime}
          // helperText={errors.estTime}
        />
        <FormControl fullWidth margin="normal" 
        // error={!!errors.priority}
        >
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            name="priority"
            label= "Priority"
            value={currTask.priority}
            onChange={handleChange}
          >
            <MenuItem value="NORMAL">Normal</MenuItem>
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </Select>
          {/* <FormHelperText>{errors.priority}</FormHelperText> */}
        </FormControl>

        <FormControl fullWidth margin="normal" 
        // error={!!errors.priority}
        >
          <InputLabel id="progress-label">Progress</InputLabel>
          <Select
            labelId="progress-label"
            name="stage"
            label= "Progress"
            value={currTask.stage}
            onChange={handleChange}
          >
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>
            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
          </Select>
          {/* <FormHelperText>{errors.priority}</FormHelperText> */}
        </FormControl>

                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button type="submit">Apply Changes</Button>
                        </DialogActions>
                      </Dialog>
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