import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const createdApi = createApi({
  reducerPath: "myapi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:4000/" ,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken; // Assuming you have an auth slice with a token in your Redux statee
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },

  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: 'api/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    userRegister: builder.mutation({
      query: (credentials) => ({
        url: 'api/users/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    inviteUser: builder.mutation({
      query: (credentials) => ({
        url: 'api/users/register-with-link',
        method: 'POST',
        body: credentials,
      }),
    }),
    createTask: builder.mutation({
      query: (credentials) =>({
        url: "api/tasks/new",
        method: 'POST',
        body: credentials,
      })
    }),
    getAllUsers: builder.mutation({
      query: (id) => "api/users/allUsers"
      // query: () =>({
      //   url: "api/users/allUsers",
      //   method: 'GET'
      // })
    })
  }),
});

export const { useUserLoginMutation , useUserRegisterMutation, useCreateTaskMutation, useGetAllUsersMutation} = createdApi;