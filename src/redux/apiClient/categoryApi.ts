import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseApi";

export const categoryApi = createApi({
  reducerPath: "categoryApi", // Unique reducerPath
  baseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ searchTerm, limit, page }) => {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);

        return {
          url: `/categories/all`,
          params: params,
          method: "GET",
        };
      },
      providesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: ({ categoryId }) => ({
        url: `/categories/single/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: (bodyData) => ({
        url: "/categories/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["Category"],
    }),
    editCategory: builder.mutation({
      query: ({ bodyData, categoryId }) => ({
        url: `/categories/update/${categoryId}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/categories/delete/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
