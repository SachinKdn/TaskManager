import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { ITask, IUser } from "../pages/login";
interface getTaskById{
  data : ITask[],
  success: boolean
}
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
    setNewPassword: builder.mutation({
      query: ({ token, credentials }) => ({
        url: `api/users/set-new-password/${token}`,
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
    }),
    getAllUser: builder.query<IUser[],string>({
      query: (id) => "api/users/allUsers"     
    }),
    getUserTaskById: builder.query<getTaskById ,string>({
      query: (id) => `api/users/${id}`
    }),
    getMyTasks: builder.mutation({
      query: (id) => `api/users/mytasks`
    }),
    deleteTaskByID: builder.mutation({
      query: (id) => ({
        url: `api/tasks/delete/${id}`,
        method: 'DELETE',
      })
    }),
    updateTaskByID: builder.mutation<void, { id: string; credentials: Partial<ITask> }>({
      query: ({ id, credentials }) => ({
        url: `api/tasks/update/${id}`,
        method: 'PUT',
        body: credentials,
      })
    }),
  }),
});

export const { useUserLoginMutation , useUserRegisterMutation, useCreateTaskMutation, useGetAllUsersMutation ,  useGetAllUserQuery, useInviteUserMutation, useGetUserTaskByIdQuery , useGetMyTasksMutation, useDeleteTaskByIDMutation, useUpdateTaskByIDMutation, useSetNewPasswordMutation} = createdApi;