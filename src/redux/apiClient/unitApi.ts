import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseApi";

export const unitApi = createApi({
  reducerPath: "unitApi", // Unique reducerPath
  baseQuery,
  tagTypes: ["Unit"],
  endpoints: (builder) => ({
    getUnits: builder.query({
      query: ({ searchTerm, limit, page }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/units/all`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["Unit"],
    }),
    getUnit: builder.query({
      query: ({ categoryId }) => ({
        url: `/units/single/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["Unit"],
    }),
    addUnit: builder.mutation({
      query: (bodyData) => ({
        url: "/units/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["Unit"],
    }),
  }),
});

export const { useGetUnitsQuery, useGetUnitQuery, useAddUnitMutation } =
  unitApi;
