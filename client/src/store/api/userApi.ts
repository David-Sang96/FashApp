import type { UserInfoProps } from "@/features/profile/components/UserInfoSection";
import { apiSlice } from "../slices/api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (payload: UserInfoProps) => ({
        url: "/users/me",
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = userApiSlice;
