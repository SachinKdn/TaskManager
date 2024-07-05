import React from 'react'
import Layout from '../Layout'
import { Box } from '@mui/material';
import UserCard from '../Layout/userCard';

const AllUsers = () => {
  return (
    <Layout>
        <div>AllUsers</div>
        <Box sx={{
            display: "flex",
            gap: "3",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap"

        }}>
            <UserCard/>

            <UserCard/>

            <UserCard/>

            <UserCard/>

            <UserCard/>

            <UserCard/>

            <UserCard/>
        </Box>
    </Layout>
  )
}

export default AllUsers