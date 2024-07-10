import React from 'react'
import Layout from '../Layout'
import { Box, Typography } from '@mui/material';
import UserCard from '../Layout/userCard';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { IUser } from './login';


const AllUsers = () => {
  const users  = useSelector((state: RootState) => state.users.users) as IUser[];
  return (
    <Layout>
      <Box>
      <Typography variant="h5" component="h1" gutterBottom sx={{color: "#161d2f", fontWeight: 600, margin: "0 auto"}}>
          All Users
        </Typography>
      <Box sx={{
        display: "flex",
        gap: "3",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap"

      }}>

{users && users.map((user : IUser, index) => (
          <UserCard keyID = {index} id={user._id}  user = {user}/>
        ))}

      </Box>
      </Box>
    </Layout>
  )
}

export default AllUsers