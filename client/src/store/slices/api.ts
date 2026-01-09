import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearUserInfo } from "./auth";

const baseUrl =
  import.meta.env.VITE_MODE === "development"
    ? import.meta.env.VITE_LOCAL_SERVER_URL
    : import.meta.env.VITE_SERVER_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include", // REQUIRED FOR COOKIES
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs, // args
  unknown, // result.data
  FetchBaseQueryError // result.error
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // access token expired
  if (
    result.error?.status === 401 &&
    //avoids calling /refresh again if refresh already failed
    typeof args === "string" &&
    !args.includes("/auth/refresh")
  ) {
    // try refresh
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      //Frontend still knows nothing but cookies are updated automatically so retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh failed → logout
      api.dispatch(clearUserInfo());
      console.log("Refresh token expired → logging out");
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
