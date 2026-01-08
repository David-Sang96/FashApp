import { apiSlice } from "../slices/api";
import type { Register } from "../types/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: Register) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = userApiSlice;
