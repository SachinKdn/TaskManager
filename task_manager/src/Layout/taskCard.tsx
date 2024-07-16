import React , { useState } from 'react'
import { Paper, Typography, Box, Grid, Chip, List, ListItem, ListItemText, Button } from '@mui/material';
import { ITask, IUser } from '../pages/login';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useLocation } from 'react-router-dom';
import { useDeleteTaskByIDMutation, useGetMyTasksMutation, useGetUserTaskByIdQuery, useUpdateTaskByIDMutation } from '../redux/api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { useDispatch } from 'react-redux';
import { setLoading, setTasks } from '../redux/reducer'
import { AppDispatch } from "../redux/store";

interface TaskCardProps {
    task: ITask;
    index: number;
  }
const TaskCard : React.FC<TaskCardProps> = ({ index, task}) => {

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [deleteTaskByID] = useDeleteTaskByIDMutation();
  const [updateTaskByID] = useUpdateTaskByIDMutation();
  const [getMyTasks, {data,error,isLoading}] = useGetMyTasksMutation();
  // const { user } = location.state as { user: IUser };
  const user  = useSelector((state: RootState) => state.auth.user) as IUser;
  // const { data, error, isLoading,refetch } = useGetUserTaskByIdQuery(user._id);
  // const [tasks, setTasks] = useState<ITask[]>([])



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
      console.log("Task is deleteing... - " + taskId)
      const result = await getMyTasks(0);
            // setTasks(result.data.data);
            console.log("Tasks Fetched from TaskCard Bcz deleted something....")
              console.log(result.data.data);
              dispatch(setTasks({tasks: result.data.data}));
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
                    <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
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
                              const fetchTasks = async ()=>{
                                dispatch(setLoading({loading : true}));
                                const result = await getMyTasks(0);
                                // setTasks(result.data.data);
                                  console.log(result.data.data);
                                  dispatch(setTasks({tasks: result.data.data}));
                                  dispatch(setLoading({loading : false}));
                              }
                              fetchTasks();
                              
                              handleClose();
                            } catch (error) {
                              console.error('Failed to update task:', error);
                            }
                          },
                        }}
                      >
                        <DialogTitle>{currTask.desc}</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                          </DialogContentText>
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
       {user && user.role === "ADMIN" ? 
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
            {/* {users.filter(user => user.isActive).map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))} */}
          </Select>
          {/* <FormHelperText>{errors.assignedTo}</FormHelperText> */}
        </FormControl>
        :""}
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
            <MenuItem value="IN PROGRESS">IN PROGRESS</MenuItem>
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
  )
}

export default TaskCard