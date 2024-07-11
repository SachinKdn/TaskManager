
import React, { useEffect, useState } from "react";
// import { useForm ,SubmitHandler, useFieldArray} from "react-hook-form";
// import * as yup from "yup"
// import {yupResolver} from "@hookform/resolvers/yup";
// import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';  // Import the CSS file
import {  useUserRegisterMutation } from "../redux/api";
import { useDispatch } from 'react-redux';
import { setLoading, setTokens ,setUser } from '../redux/reducer'
import { AppDispatch } from "../redux/store";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ValidationError } from "../errorType";
import { Slide, toast } from 'react-toastify';
import { Box, Button, Typography, TextField, Link } from '@mui/material';
// enum UserRole {
//     USER = "USER",
//     ADMIN = "ADMIN",
//   }

// interface IFormInput {
//     name: string;
//     email: string;
//     password: string;
//     role: 'USER' | 'ADMIN';
//   }


//yup schema creation
// const inputSchema = yup.object().shape({
//     name: yup.string().required("User Name is required."),
//     email: yup.string().required("Email is a required field."),
//     password: yup.string().required("Password is a required field."),
//     role: yup.string().oneOf(['USER', 'ADMIN'], 'Invalid role').required('Role is required'),

// })
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


const SignUp : React.FC= () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user  = useSelector((state: RootState) => state.auth.user) as IUser;
  
  const navigate = useNavigate();
  const [userRegister] = useUserRegisterMutation();
  const dispatch = useDispatch<AppDispatch>();
    // const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    //     resolver: yupResolver(inputSchema),
    //   });
      const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        role: "USER",
      });
      const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
      });
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name as string]: value,
        });
        setErrors({
          ...errors,
          [name]: '',
        });
      };
      const handleSubmit = async () => {
        
        const newErrors = {
          name: userData.name ? '' : 'Name is required',
          // desc: task.desc ? '' : 'Description is required',
          email: userData.email ? '' : 'Email of user is required',
          password: userData.password ? '' : 'Password are required',
          role: userData.role ? '' : 'Role is required',
        };
        if (Object.values(newErrors).some(error => error)) {
          setErrors(newErrors);
          return;
        } else {
        console.log('User Data:', userData);
        try {
          dispatch(setLoading({loading : true}));
          const result = await userRegister(userData).unwrap();
          console.log("Signup successful:", result); 
          localStorage.setItem('token', result.data.accessToken);
          console.log(result.data.user);
          dispatch(setUser({user: result.data.user}));
          dispatch(setTokens({accessToken: result.data.accessToken, refreshToken: result.data.refreshToken }))
          if(result.data.user.role === "ADMIN"){
            navigate("/admin")
          }
          navigate('/');
          // Handle successful login (e.g., store tokens, redirect user)
        } catch (err) {
          const validationError = err as ValidationError;
          dispatch(setLoading({loading : false}));
          console.error("Signup failed:", validationError.data.data.errors[0].msg);
          toast.error(validationError.data.data.errors[0].msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
            });
        }
        }
      };
      // const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      //   try {
      //     dispatch(setLoading({loading : true}));
      //     console.log(data);
      //     const result = await userRegister(data).unwrap();
      //     console.log("Signup successful:", result); 
      //     localStorage.setItem('token', result.data.accessToken);
      //     console.log(result.data.user);
      //     dispatch(setUser({user: result.data.user}));
      //     dispatch(setTokens({accessToken: result.data.accessToken, refreshToken: result.data.refreshToken }))
      //     if(result.data.user.role === "ADMIN"){
      //       navigate("/admin")
      //     }
      //     navigate('/');
      //     // Handle successful login (e.g., store tokens, redirect user)
      //   } catch (err) {
      //     const validationError = err as ValidationError;
      //     dispatch(setLoading({loading : false}));
      //     console.error("Signup failed:", validationError.data.data.errors[0].msg);
      //     toast.error(validationError.data.data.errors[0].msg, {
      //       position: "top-right",
      //       autoClose: 3000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: false,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "dark",
      //       transition: Slide,
      //       });
      //   }
      // };
      useEffect(() => {
        if (isAuthenticated) {
            if(user.role === "ADMIN" ) navigate('/admin');
          navigate('/'); // Redirect to Home if not authenticated
        }
      }, [isAuthenticated, navigate,user.role]);
  return (
    <div className="loginbox">
      <Box
      component="form"
      // onSubmit={handleLogin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '30vh',
        padding: 4,
        backgroundColor: '#dddddd',
        width: {
          lg: "250px",
          md: "350px",
          sm: "50vw",
          xs: "80vw"
        },
        borderRadius:"8px",
        border: "1px soild #b7dbdb",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{
        fontSize: "1.7rem",
        fontFamily: "Inter, sans-serif",
        fontWeight: "700"
      }}>
        SignUp
      </Typography>
      
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={userData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        value={userData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        name="password"
        value={userData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />
      <FormControl fullWidth margin="normal" error={!!errors.role}>
          <InputLabel id="assignedTo-label">Role</InputLabel>
          <Select
            labelId="assignedTo-label"
            name="role"
            label= "Role"
            value={userData.role}
            onChange={handleChange}
          >
            
              <MenuItem key="1" value="USER">
                USER
              </MenuItem>
              <MenuItem key="2" value="ADMIN">
                ADMIN
              </MenuItem>
            
          </Select>
          <FormHelperText>{errors.role}</FormHelperText>
        </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2, mb: 2 }}
        onClick={handleSubmit}
      >
        Register
      </Button>
      <Link
          onClick={() => navigate('/login')}
          sx={{ 
            marginTop: "10px",
            cursor: "pointer",
           }}
        >
          Already have an account
        </Link>
    </Box>
    {/* <div className="login-container">
    <h2>Signup</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        <label htmlFor="name">Username</label>
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Password</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register('role')} defaultValue="user">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        {errors.role && <p>{errors.role.message}</p>}
      </div>
      
      <button type="submit">SignUp</button>
      <Link
          onClick={() => navigate('/login')}
          sx={{ mt: "10px",
            cursor: "pointer"
           }}
        >
          Already have an account
        </Link>
    </form>
  </div> */}
  </div>
  )
}

export default SignUp