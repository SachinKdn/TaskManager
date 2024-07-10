
import React, { useEffect } from "react";
import { useForm ,SubmitHandler, useFieldArray} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
// import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';  // Import the CSS file
import { useUserLoginMutation, useUserRegisterMutation } from "../redux/api";
import { useDispatch } from 'react-redux';
import { setLoading, setTokens, resetTokens ,setUser } from '../redux/reducer'
import { AppDispatch } from "../redux/store";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from "@mui/material";
import { ValidationError } from "../errorType";
import { Slide, toast } from 'react-toastify';
enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
  }

interface IFormInput {
    name: string;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN';
  }


//yup schema creation
const inputSchema = yup.object().shape({
    name: yup.string().required("User Name is required."),
    email: yup.string().required("Email is a required field."),
    password: yup.string().required("Password is a required field."),
    role: yup.string().oneOf(['USER', 'ADMIN'], 'Invalid role').required('Role is required'),

})
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
          const result = await userRegister(data).unwrap();
          console.log("Signup successful:", result); 
          localStorage.setItem('token', result.data.accessToken);
          console.log(result.data.user);
          dispatch(setUser({user: result.data.user}));
          dispatch(setTokens({accessToken: result.data.accessToken, refreshToken: result.data.refreshToken }))
          if(result.data.user.role == "ADMIN"){
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
      };
      React.useEffect(() => {
        if (isAuthenticated) {
            if(user.role == "ADMIN" ) navigate('/admin');
          navigate('/'); // Redirect to Home if not authenticated
        }
      }, [isAuthenticated, navigate]);
  return (
    <div className="loginbox">
    <div className="login-container">
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
  </div>
  </div>
  )
}

export default SignUp