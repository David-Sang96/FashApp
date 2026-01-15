import { apiSlice } from "../slices/api";
import type { UserInfo } from "../types/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (payload: UserInfo) => ({
        url: "/users/me",
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = userApiSlice;
