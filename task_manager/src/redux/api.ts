import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createdApi = createApi({
  reducerPath: "myapi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
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
  }),
});

export const { useUserLoginMutation , useUserRegisterMutation} = createdApi;