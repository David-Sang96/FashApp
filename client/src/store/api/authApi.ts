import { apiSlice } from "../slices/api";
import { setUserInfo, type User } from "../slices/auth";
import type {
  Deactivate,
  ForgetPassword,
  ForgetPasswordEmail,
  Login,
  Register,
  ResendEmail,
  UpdatePassword,
} from "../types/auth";

interface MeResponse {
  success: boolean;
  user: User;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<MeResponse, void>({
      query: () => "/auth/me",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserInfo(data.user));
        } catch {
          //Only logout if you get 401 after refresh token attempt
          // dispatch(clearUserInfo());
        }
      },
    }),

    register: builder.mutation({
      query: (payload: Register) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
    }),

    login: builder.mutation({
      query: (payload: Login) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(setUserInfo(data.user)); //  key line for relogin after logout
      //   } catch {
      //     // optional: handle error
      //   }
      // },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    updatePassword: builder.mutation({
      query: (payload: UpdatePassword) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: payload,
      }),
    }),

    forgetEmail: builder.mutation({
      query: (payload: ForgetPasswordEmail) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: payload,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (payload: ForgetPassword) => ({
        url: `/auth/reset-password?token=${payload.token}`,
        method: "POST",
        body: payload,
      }),
    }),

    resendEmail: builder.mutation({
      query: (payload: ResendEmail) => ({
        url: "/auth/resend",
        method: "POST",
        body: payload,
      }),
    }),

    deactivate: builder.mutation({
      query: (payload: Deactivate) => ({
        url: "/auth/me",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useMeQuery,
  useLogoutMutation,
  useUpdatePasswordMutation,
  useDeactivateMutation,
  useForgetEmailMutation,
  useForgetPasswordMutation,
  useResendEmailMutation,
} = authApiSlice;
