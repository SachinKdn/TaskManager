
import React, { useEffect, useState } from "react";
// import { useForm ,SubmitHandler, useFieldArray} from "react-hook-form";
// import * as yup from "yup"
// import {yupResolver} from "@hookform/resolvers/yup";
// import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './login.css';  // Import the CSS file
import { useUserLoginMutation } from "../redux/api";
import { useDispatch } from 'react-redux';
import { setLoading, setTokens ,setUser } from '../redux/reducer'
import { AppDispatch } from "../redux/store";
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, Button, Typography, TextField, Link } from '@mui/material';
import { ApiError } from "../errorType";
import {  toast } from 'react-toastify';

// enum UserRole {
//     USER = "USER",
//     ADMIN = "ADMIN",
//   }
  export interface ITask{
    _id: string,
    title: string,
    desc: string,
    priority: string,
    stage: string,
    estTime: number,
    assignedTo: string
  }
  export interface IUser {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    isActive: boolean;
    password: string;
    tasks: ITask[];
    role: string;
  }
// interface IFormInput {
//     email: string;
//     password: string;
//   }


//yup schema creation
// const inputSchema = yup.object().shape({
//     email: yup.string().required("Email is a required field."),
//     password: yup.string().required("Password is a required field."),

// })


const Login : React.FC= () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add login logic here
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Proceed with login logic
      console.log('Form submitted:', { email, password });
    }
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      dispatch(setLoading({loading : true}));
      const data = {email,password};
      console.log(data);
      const result = await userLogin(data).unwrap();
      console.log("Login successful:", result);
      localStorage.setItem('token', result.data.accessToken);
      console.log(result.data.user.role);
      dispatch(setUser({user: result.data.user}));
      dispatch(setTokens({accessToken: result.data.accessToken, refreshToken: result.data.refreshToken }))
      dispatch(setLoading({loading : false}));
      if(result.data.user.role === "ADMIN"){
        console.log("Logged by ADMIN")
        navigate("/admin")
      }else{
        console.log("Logged by USER")
        navigate('/');
      }
      // Handle successful login (e.g., store tokens, redirect user)
    } catch(err) {
      console.log(err)
      const apiError = err as ApiError;
        if (apiError?.data?.message) {
          console.log(apiError?.data?.message)
          toast(apiError?.data?.message, { type: "error" });
        }
      // const validationError = err as ValidationError;
      dispatch(setLoading({loading : false}));
    }
  };



  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user  = useSelector((state: RootState) => state.auth.user) as IUser;
  const navigate = useNavigate();

  const [userLogin] = useUserLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
    // const { register, handleSubmit} = useForm<IFormInput>({
    //     resolver: yupResolver(inputSchema),
    //   });
    
    //   const onSubmit: SubmitHandler<IFormInput> = (data) => {
    //     console.log(data);
    //   };
    

      // const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      //   try {
      //     dispatch(setLoading({loading : true}));
      //     console.log(data);
      //     const result = await userLogin(data).unwrap();
      //     console.log("Login successful:", result);
      //     localStorage.setItem('token', result.data.accessToken);
      //     console.log(result.data.user.role);
      //     dispatch(setUser({user: result.data.user}));
      //     dispatch(setTokens({accessToken: result.data.accessToken, refreshToken: result.data.refreshToken }))
      //     dispatch(setLoading({loading : false}));
      //     if(result.data.user.role === "ADMIN"){
      //       console.log("Logged by ADMIN")
      //       navigate("/admin")
      //     }else{
      //       console.log("Logged by USER")
      //       navigate('/');
      //     }
      //     // Handle successful login (e.g., store tokens, redirect user)
      //   } catch(err) {
      //     console.log(err)
      //     const apiError = err as ApiError;
      //       if (apiError?.data?.message) {
      //         console.log(apiError?.data?.message)
      //         toast(apiError?.data?.message, { type: "error" });
      //       }
      //     // const validationError = err as ValidationError;
      //     dispatch(setLoading({loading : false}));

      //     // console.error("Signup failed:", validationError.data.data.errors[0].msg);
      //     // toast.error(validationError.data.data.errors[0].msg, {
      //     //   position: "top-right",
      //     //   autoClose: 3000,
      //     //   hideProgressBar: false,
      //     //   closeOnClick: true,
      //     //   pauseOnHover: false,
      //     //   draggable: true,
      //     //   progress: undefined,
      //     //   theme: "dark",
      //     //   transition: Slide,
      //     //   });
      //   }
      // };
      useEffect(() => {
        if (isAuthenticated) {
          if(user.role === "ADMIN" ) {
            console.log("Logged Effect by ADMIN")
            navigate('/admin');
          }else{
            console.log("Logged USER")
            navigate('/');
          }
           // Redirect to Home if not authenticated
      }
      }, [isAuthenticated, navigate,user.role]);
  return (
    <div className="loginbox">
    {/* <div className="login-container"> */}
    {/* <h2>Login</h2> */}
    {/* <form onSubmit={handleSubmit(onSubmit)}>
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
      
      
      <button type="submit">Login</button>

      <Link
          onClick={() => navigate('/signup')}
          sx={{ mt: "10px",
            cursor: "pointer"
           }}
        >
          Create a new account
        </Link>
    </form> */}
    <Box
      component="form"
      onSubmit={handleLogin}
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
        Login
      </Typography>
      
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2, mb: 2 }}
      >
        Login
      </Button>
      <Link
          onClick={() => navigate('/signup')}
          sx={{ 
            marginTop: "10px",
            cursor: "pointer",
           }}
        >
          Create a new account
        </Link>
    </Box>

    
  {/* </div> */}
  </div>
  )
}

export default Login