
import React, { useEffect } from "react";
import { useForm ,SubmitHandler, useFieldArray} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
// import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';  // Import the CSS file
import { useUserLoginMutation } from "../redux/api";


enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
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

  const [userLogin, { data, error, isLoading }] = useUserLoginMutation();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(inputSchema),
      });
    
    //   const onSubmit: SubmitHandler<IFormInput> = (data) => {
    //     console.log(data);
    //   };

      const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
          console.log(data);
          const result = await userLogin(data)
        //   .unwrap();
          console.log("Login successful:", result);
          console.log(result);
          // Handle successful login (e.g., store tokens, redirect user)
        } catch (err) {
          console.error("Login failed:", err);
        }
      };
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
    </form>
  </div>
  </div>
  )
}

export default Login