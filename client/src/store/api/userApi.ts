import { apiSlice } from "../slices/api";
import { setUserInfo, type User } from "../slices/auth";
import type { Login, Register } from "../types/user";

interface MeResponse {
  success: boolean;
  user: User;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<MeResponse, void>({
      query: () => "/auth/me",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserInfo(data.user));
        } catch {
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
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useMeQuery,
  useLogoutMutation,
} = userApiSlice;
