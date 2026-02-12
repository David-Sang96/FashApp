import { apiSlice } from "../slices/api";
import type { CreateProductResponse, Product } from "../types/product";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProducts: builder.query<
      { success: boolean; result: Product[] },
      void
    >({
      query: () => "/products/admin/all",
      providesTags: ["Product"],
    }),

    createProduct: builder.mutation<CreateProductResponse, Partial<Product>>({
      query: (newProduct) => ({
        url: "/products",
        body: newProduct,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<
      { success: boolean; message: string },
      { productId: string }
    >({
      query: ({ productId }) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProductImage: builder.mutation<
      { success: boolean; message: string },
      { productId: string; publicId: string }
    >({
      query: ({ productId, publicId }) => ({
        url: `/products/${productId}/image/${encodeURIComponent(publicId)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAdminProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteProductImageMutation,
} = adminApiSlice;
