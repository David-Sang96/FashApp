import type { UserInfoProps } from "@/features/profile/components/UserInfoSection";
import { apiSlice } from "../slices/api";
import type { UserInfo } from "../types/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (payload: UserInfoProps) => ({
        url: "/users/me",
        method: "PUT",
        body: payload,
      }),
    }),

    getAllUsers: builder.query<{ success: boolean; users: UserInfo[] }, void>({
      query: () => "/users",
    }),
  }),
});

export const { useUpdateUserMutation, useGetAllUsersQuery } = userApiSlice;
