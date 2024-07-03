import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const createdApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: 'api/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useUserLoginMutation } = createdApi;