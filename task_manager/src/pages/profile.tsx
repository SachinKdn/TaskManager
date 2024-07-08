import React from 'react';
import { Box, Typography, Button, Avatar, Paper, Grid } from '@mui/material';
import Layout from '../Layout';
import { IUser } from './login';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';



const Profile: React.FC = () => {

  const user  = useSelector((state: RootState) => state.auth.user) as IUser;


  return (

    <Layout>
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item sx={{
          width: "25%"
        }}>
          <Avatar alt={user.name} src="https://joesch.moe/api/v1/random" sx={{ width: 100, height: 100 , margin: "auto"}} />
        </Grid>
        <Grid item xs>
          <Typography variant="h5" sx={{
                                fontWeight: 500,
                                fontFamily: "Poppins",
                                fontSize: "1.5rem",
                                color: "#161d2f"
                            }}>{user.name}</Typography>
          <Typography variant="body1" sx={{fontFamily: "Poppins",fontSize:"0.9rem",color: "#003210", margin: "0 auto"}}>{user.email}</Typography>
          <Typography variant="body1" sx={{
            fontWeight: "500",
            fontFamily: "Poppins",
                    fontSize: "1rem",
                    color: "#2a6c11"
          }}>{user.role === 'ADMIN' ? 'Administrator' : 'Simple User'}</Typography>
        </Grid>
      </Grid>
      {/* <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" >
          Update Profile
        </Button>
      </Box> */}
    </Paper>
    </Layout>
  );
};

export default Profile;
