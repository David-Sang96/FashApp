import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearUserInfo } from "./auth";

export const baseUrl =
  import.meta.env.VITE_MODE === "development"
    ? import.meta.env.VITE_LOCAL_SERVER_URL
    : import.meta.env.VITE_SERVER_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let refreshPromise: Promise<any> | null = null;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs, // args
  unknown, // result.data
  FetchBaseQueryError // result.error
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // backend down / network error → do nothing
  if (result.error?.status === "FETCH_ERROR") {
    return result;
  }

  //avoids calling /refresh again if refresh already failed
  const isRefreshCall =
    (typeof args === "string" && args.includes("/auth/refresh")) ||
    (typeof args !== "string" && args.url?.includes("/auth/refresh"));

  // access token expired
  if (result.error?.status === 401 && !isRefreshCall) {
    //  create or reuse refresh promise
    if (!refreshPromise) {
      refreshPromise = Promise.resolve(
        baseQuery({ url: "/auth/refresh", method: "POST" }, api, extraOptions),
      );
    }

    const refreshResult = await refreshPromise;
    refreshPromise = null;

    if (!refreshResult.error) {
      //Frontend still knows nothing but cookies are updated automatically so retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh failed → logout
      api.dispatch(clearUserInfo());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Product"],
  endpoints: () => ({}),
});
