
import React, { useEffect, useState } from "react";
import { useForm ,SubmitHandler, useFieldArray} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
// import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';  // Import the CSS file
import { useSetNewPasswordMutation, useUserLoginMutation, useUserRegisterMutation } from "../redux/api";
import { useDispatch } from 'react-redux';
import { setLoading, setTokens, resetTokens ,setUser } from '../redux/reducer'
import { AppDispatch } from "../redux/store";

import { Slide, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, TextField } from "@mui/material";
import { IUser } from "./login";
import { Button } from "@mui/material";

interface setPass{
    name: string,
    password: string
}
const ResetPasword = () => {
    const location = useLocation();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user  = useSelector((state: RootState) => state.auth.user) as IUser;
  const navigate = useNavigate();
  const [userData, setUserData] = useState<setPass>({
    name: "",
    password: ""
  })
  const [errors, setErrors] = useState({
    name: "",
    password: ""
  });
  const [setNewPassword] = useSetNewPasswordMutation();
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{

    const {name, value} = e.target;
    setUserData({
        ...userData,
        [name as string] : value,
    })
    setErrors({
        ...errors,
        [name]: '',
      });

  }
  const getTokenFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('token'); // 'token' is the query parameter name
  };

  const handleSubmit = async () => {
    const newErrors = {
        name: userData.name ? '' : 'Name is required',
        // desc: task.desc ? '' : 'Description is required',
        password: userData.password ? '' : 'Password is must.'
      };
      if (Object.values(newErrors).some(error => error)) {
        setErrors(newErrors);
        return;
      } else {
      console.log('UserData :', userData);

        const token = getTokenFromUrl();
        try{
          console.log({token, userData})
            const result = await setNewPassword({token, credentials : userData}).unwrap();
            console.log("Password Set successful:", result);
            toast.success('New Password Set Successfully!!', {
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
            navigate("/login")
        }catch(err){
            console.error("Process failed:", err);
          }
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
    <h2>Create New Password</h2>
    <form onSubmit={handleSubmit}>
        {/* <div>
        <label htmlFor="name">Username</label>
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div> */}
      {/* <div>
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
        </Link> */}
        <TextField
          label="Username"
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
        type="password"
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          value={userData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Save Password
        </Button>
    </form>
  </div>
  </div>
  )
}

export default ResetPasword