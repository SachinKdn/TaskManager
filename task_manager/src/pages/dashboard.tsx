import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { useGetAllUsersMutation } from "../redux/api";
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { IUser } from './login';
import { setIsLoading, setUsers } from '../redux/reducer'


const DashboardAdmin = () => {
  const [getAllUsers] = useGetAllUsersMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [users, setAllUsersState] = useState([]);
  useEffect(() => {
    dispatch(setIsLoading({loading : true}));
    const fetchData = async () => {
      try {
        const result = await getAllUsers(1); // Assuming getAllUsers action creator is correctly configured
        setAllUsersState(result.data.data)
        console.log(result);
        dispatch(setUsers({users: result.data.data }))
        dispatch(setIsLoading({loading : false}));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  },[dispatch])

  return (
    <Layout>
    <div>Dashboard</div>
    <ul>
        {users.map((user : IUser) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </Layout>
  )
}

export default DashboardAdmin