
import React, { useEffect } from "react";
import { useForm ,SubmitHandler, useFieldArray} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
// import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../Layout";
import './inviteUser.css';  // Import the CSS file




interface IFormInput {
    email: string;
    role: 'USER' | 'ADMIN';
  }


//yup schema creation
const inputSchema = yup.object().shape({
    email: yup.string().required("Email is a required field."),
    role: yup.string().oneOf(['USER', 'ADMIN'], 'Invalid role').required('Role is required'),

})


const InviteUser : React.FC= () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(inputSchema),
      });
    
      const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
      };
  return (
    <Layout>
    <div className="box">
    <div className="invite-container">
    <h2>Invite New User</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      
      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register('role')} defaultValue="user">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        {errors.role && <p>{errors.role.message}</p>}
      </div>
      
      <button type="submit">Send Invitation Link</button>
    </form>
  </div>
  </div>
  </Layout>
  )
}

export default InviteUser