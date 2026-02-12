import { apiSlice } from "../slices/api";
import type {
  GetProductsParams,
  GetProductsResponse,
  Product,
  ProductMeta,
} from "../types/product";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductsMeta: builder.query<ProductMeta, void>({
      query: () => "/products/filters/meta",
    }),

    getProducts: builder.query<GetProductsResponse, GetProductsParams>({
      query: (params) => {
        const query = new URLSearchParams();
        if (params.category) query.append("category", params.category);
        if (params.colors) query.append("colors", params.colors.join(","));
        if (params.sizes) query.append("sizes", params.sizes.join(","));
        if (params.priceMin) query.append("priceMin", String(params.priceMin));
        if (params.priceMax) query.append("priceMax", String(params.priceMax));
        if (params.sort) query.append("sort", params.sort);
        if (params.page) query.append("page", String(params.page));
        if (params.limit) query.append("limit", String(params.limit));
        if (params.search) query.append("search", params.search);
        if (params.is_newArrival)
          query.append("is_newArrival", String(params.is_newArrival));
        if (params.is_feature)
          query.append("is_feature", String(params.is_feature));

        return `/products?${query.toString()}`;
      },
    }),

    getNewArrivals: builder.query({
      query: () => "/products/new-arrival",
    }),

    getFeatured: builder.query({
      query: () => "/products/feature",
    }),

    getOneProduct: builder.query<
      { success: boolean; product: Product },
      string
    >({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetFeaturedQuery,
  useGetNewArrivalsQuery,
  useGetOneProductQuery,
  useGetProductsMetaQuery,
} = productApiSlice;
