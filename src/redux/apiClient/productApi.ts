import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseApi";

export const productApi = createApi({
  reducerPath: "productApi", // Unique reducerPath
  baseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ searchTerm, category, limit, page }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (category) params.append("category", category);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/products/all`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: ({ productId }) => ({
        url: `/products/single/${productId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (bodyData) => ({
        url: "/products/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["Product"],
    }),
    editProduct: builder.mutation({
      query: ({ bodyData, productId }) => ({
        url: `/products/update/${productId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: ({ productId }) => ({
        url: `/products/delete/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productApi;
