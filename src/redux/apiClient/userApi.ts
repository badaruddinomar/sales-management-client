import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseApi";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    userSignup: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
    userLogin: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/signin",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
    verifyEmail: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/verify-email",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
  }),
});

export const {
  useUserSignupMutation,
  useUserLoginMutation,
  useVerifyEmailMutation,
} = userApi;
