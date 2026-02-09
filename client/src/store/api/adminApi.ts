import { apiSlice } from "../slices/api";
import type { Product } from "../types/product";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProducts: builder.query<
      { success: boolean; result: Product[] },
      void
    >({
      query: () => "/products/admin/all",
    }),
  }),
});

export const { useGetAdminProductsQuery } = adminApiSlice;
