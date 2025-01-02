import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseApi";

export const saleApi = createApi({
  reducerPath: "saleApi", // Unique reducerPath
  baseQuery,
  tagTypes: ["Sale"],
  endpoints: (builder) => ({
    getSales: builder.query({
      query: ({ searchTerm, limit, page }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/sales/all`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["Sale"],
    }),
    getSale: builder.query({
      query: ({ saleId }) => ({
        url: `/sales/single/${saleId}`,
        method: "GET",
      }),
      providesTags: ["Sale"],
    }),
    createSale: builder.mutation({
      query: (bodyData) => ({
        url: "/sales/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["Sale"],
    }),
    editSale: builder.mutation({
      query: ({ bodyData, saleId }) => ({
        url: `/sales/update/${saleId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["Sale"],
    }),
    deleteSale: builder.mutation({
      query: (saleId) => ({
        url: `/sales/delete/${saleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sale"],
    }),
  }),
});

export const {
  useGetSaleQuery,
  useGetSalesQuery,
  useCreateSaleMutation,
  useEditSaleMutation,
  useDeleteSaleMutation,
} = saleApi;
