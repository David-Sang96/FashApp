import { apiSlice } from "../slices/api";
import { clearUserInfo, setUserInfo, type User } from "../slices/auth";
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
          console.log(data);
          dispatch(setUserInfo(data.user));
        } catch {
          dispatch(clearUserInfo());
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
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useMeQuery } =
  userApiSlice;
