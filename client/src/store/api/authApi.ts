import { apiSlice } from "../slices/api";
import { clearUserInfo, setUserInfo } from "../slices/auth";
import type {
  Deactivate,
  ForgetPassword,
  ForgetPasswordEmail,
  Login,
  Register,
  ResendEmail,
  UpdatePassword,
} from "../types/auth";
import type { UserInfo } from "../types/user";

interface MeResponse {
  success: boolean;
  user: UserInfo;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<MeResponse, void>({
      query: () => "/auth/me",
      providesTags: (result) =>
        result ? [{ type: "User", id: result.user._id }] : ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserInfo(data.user)); // auth state only
        } catch (err) {
          console.error("Failed to fetch user: ", err);
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
      invalidatesTags: ["User"],
    }),

    /* 
        Advantage of resetApiState()
        Prevents stale data
        Avoids auth bugs
        Makes logout truly “clean”
        Saves you from edge-case nightmares
    
        Most production apps do one of these on logout:
       ✔ resetApiState()
       ✔ full page reload
       ✔ store rehydration reset
      */
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          // Always clear local state, even if backend fails
          dispatch(clearUserInfo());
          dispatch(apiSlice.util.resetApiState()); //  clears RTK Query cache | Reset API cache on logout
        }
      },
    }),

    uploadAvatar: builder.mutation({
      query: (formData: FormData) => ({
        url: "/auth/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation({
      query: (payload: UpdatePassword) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
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
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useMeQuery,
  useLogoutMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useDeactivateMutation,
  useForgetEmailMutation,
  useForgetPasswordMutation,
  useResendEmailMutation,
} = authApiSlice;
