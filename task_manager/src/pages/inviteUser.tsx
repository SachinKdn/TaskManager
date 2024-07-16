
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
// import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../Layout";
import './inviteUser.css';  // Import the CSS file
import { useGetAllUserQuery, useInviteUserMutation } from "../redux/api";
import { Slide, toast } from 'react-toastify';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

import { setUsers} from '../redux/reducer'
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../redux/store";
import { Navigate } from "react-router-dom";

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

  const dispatch = useDispatch<AppDispatch>();
  const  { data : allUsers, error, isLoading : isLoadingOfAllUsers , refetch } = useGetAllUserQuery("");
    const [inviteUser,  { data, isLoading }] = useInviteUserMutation();

    const {  reset } = useForm<IFormInput>({
        resolver: yupResolver(inputSchema),
      });
      const [newUser, setNewUser] = useState({
        email: '',
        role: 'USER',
      });
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        console.log({name, value})
        setNewUser({
          ...newUser,
          [name as string]: value,
        });
      };
    
      const onSubmit = async () => {
        console.log(newUser);
        const result = await inviteUser(newUser)
          if(!result.error){          
        console.log("Invitation successful:", result);
        refetch();
        if (!isLoadingOfAllUsers && allUsers) {
          console.log("Users fetched from the onSubmit of inviteUser");
          dispatch(setUsers({users: allUsers }))
       }
       setNewUser({
        email: '',
        role: 'USER',
      });
        // reset({email: "",role:"USER"});
        // reset();
        toast.success('🦄 Invitation mail sent successfully!!', {
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
        }else{
          toast.error('Error occured. (Try Again or report to developer)'   , {
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
  return (
    <Layout>
      {isLoading ? <div>We are processing your request. WAIT A MOMENT</div> : 
    <div className="box">
    <div className="invite-container">
    <h2>Invite New User</h2>
    <Box>
      {/* <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div> */}
      
      {/* <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register('role')} defaultValue="USER">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        {errors.role && <p>{errors.role.message}</p>}
      </div> */}
      <TextField
          // label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Enter Email"
          InputProps={{
            sx: {
              '& .MuiInputBase-input': {
                border: '0px',
                margin: "auto",
                padding: "13px 10px"
              },
            },
          }}
          // error={!!errors.title}
          // helperText={errors.title}
        />

      <FormControl fullWidth>
      
  <InputLabel id="demo-simple-select-label">Role</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={newUser.role}
    label="role"
    name="role"
    // {...register('role')}
    onChange={handleChange}
  >
    <MenuItem value="USER">User</MenuItem>
    <MenuItem value="ADMIN">Admin</MenuItem>
  </Select>
</FormControl>
      
      <button type="submit" onClick={onSubmit} style={{marginTop: "20px"}}>Send Invitation Link</button>
    </Box>
  </div>
  </div>
}
  </Layout>
  )
}

export default InviteUser