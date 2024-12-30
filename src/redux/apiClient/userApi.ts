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
    forgotPassword: builder.mutation({
      query: (bodyData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, bodyData }) => ({
        url: `/auth/reset-password?token=${token}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
    resendVerifyCode: builder.mutation({
      query: (bodyData) => ({
        url: `/auth/resend-verify-code`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useUserSignupMutation,
  useUserLoginMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendVerifyCodeMutation,
  useLogoutMutation,
} = userApi;
