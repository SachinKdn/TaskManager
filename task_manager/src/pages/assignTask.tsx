// src/AssignTask.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  FormHelperText,
  Input,
} from '@mui/material';
import Layout from '../Layout';
import { useCreateTaskMutation } from "../redux/api";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export interface IUser {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  isActive: boolean;
  password: string;
  tasks: object[];
  role: string;
}

type Task = {
  title: string;
  desc: string;
  assignedTo: string;
  estTime: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'NORMAL';
};

// const users: User[] = [
//   { id: '1', name: 'User One' },
//   { id: '2', name: 'User Two' },
//   { id: '3', name: 'User Three' },
// ];
    
 const AssignTask: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users) as IUser[];

  const user = useSelector((state: RootState) => state.auth.user) as IUser;
  const [createTask, { data, error, isLoading }] = useCreateTaskMutation();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>({
    title: '',
    desc: '',
    assignedTo: '',
    estTime: 2,
    priority: 'NORMAL',
  });
  const [errors, setErrors] = useState({
    title: '',
    // desc: '',
    assignedTo: '',
    estTime: '',
    priority: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name as string]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async () => {
    if(user.role === "USER"){
      console.log("User role is USER")
      setTask({
        ...task,
        assignedTo: user._id,
      });
    }
    console.log("Task assigned to - " + task.assignedTo);
    const newErrors = {
      title: task.title ? '' : 'Title is required',
      // desc: task.desc ? '' : 'Description is required',
      assignedTo: task.assignedTo ? '' : 'Assign to user is required',
      estTime: task.estTime ? '' : 'Estimation hours are required',
      priority: task.priority ? '' : 'Priority is required',
    };
    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    } else {
    console.log('Task Assigned:', task);
    const result = await createTask(task).unwrap();
    console.log("Creation successful:", result);
    navigate("/")
    }
  };

  return (
    <Layout>
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{color: "#161d2f", fontWeight: 600}}>
          Assign Task
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="title"
          value={task.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          name="desc"
          value={task.desc}
          onChange={handleChange}
          // error={!!errors.desc}
          // helperText={errors.desc}
        />
       {user && user.role === "ADMIN" ? 
       <FormControl fullWidth margin="normal" error={!!errors.assignedTo}>
          <InputLabel id="assignedTo-label">Assign To</InputLabel>
          <Select
            labelId="assignedTo-label"
            name="assignedTo"
            label= "Assign To"
            value={task.assignedTo}
            onChange={handleChange}
          >
            {users.filter(user => user.isActive).map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.assignedTo}</FormHelperText>
        </FormControl>
        :""}
        <TextField
          label="Estimation Hours"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="estTime"
          value={task.estTime}
          onChange={handleChange}
          error={!!errors.estTime}
          helperText={errors.estTime}
        />
        <FormControl fullWidth margin="normal" error={!!errors.priority}>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            name="priority"
            label= "Priority"
            value={task.priority}
            onChange={handleChange}
          >
            <MenuItem value="NORMAL">Normal</MenuItem>
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </Select>
          <FormHelperText>{errors.priority}</FormHelperText>
        </FormControl>
        
      
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Assign Task
        </Button>

        {/* <FormControl>
            <InputLabel  htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl> */}

        
      </Box>
    </Container>
    </Layout>
  );
};
export default AssignTask;
