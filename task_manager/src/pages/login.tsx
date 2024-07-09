
import React, { useEffect } from "react";
import { useForm ,SubmitHandler, useFieldArray} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
// import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';  // Import the CSS file
import { useUserLoginMutation } from "../redux/api";
import { useDispatch } from 'react-redux';
import { setLoading, setTokens, resetTokens ,setUser } from '../redux/reducer'
import { AppDispatch } from "../redux/store";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, Button, Typography, TextField, Link } from '@mui/material';

enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
  }
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
interface IFormInput {
    email: string;
    password: string;
  }


//yup schema creation
const inputSchema = yup.object().shape({
    email: yup.string().required("Email is a required field."),
    password: yup.string().required("Password is a required field."),

})


const Login : React.FC= () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user  = useSelector((state: RootState) => state.auth.user) as IUser;
  const navigate = useNavigate();

  const [userLogin, { data, error, isLoading }] = useUserLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(inputSchema),
      });
    
    //   const onSubmit: SubmitHandler<IFormInput> = (data) => {
    //     console.log(data);
    //   };
    

      const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
          dispatch(setLoading({loading : true}));
          console.log(data);
          const result = await userLogin(data)
        //   .unwrap();
          localStorage.setItem('token', result.data.data.accessToken);
          console.log("Login successful:", result);
          console.log(result.data.data.user.role);
          dispatch(setUser({user: result.data.data.user}));
          dispatch(setTokens({accessToken: result.data.data.accessToken, refreshToken: result.data.data.refreshToken }))
          dispatch(setLoading({loading : false}));
          if(result.data.data.user.role === "ADMIN"){
            console.log("Logged by ADMIN")
            navigate("/admin")
          }else{
            console.log("Logged by USER")
            navigate('/');
          }
          // Handle successful login (e.g., store tokens, redirect user)
        } catch (err) {
          console.error("Login failed:", err);
        }
      };
      React.useEffect(() => {
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
      }, [isAuthenticated, navigate]);
  return (
    <div className="loginbox">
    <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
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
    </form>

    
  </div>
  </div>
  )
}

export default Login