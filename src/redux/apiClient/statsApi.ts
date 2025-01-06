import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseApi";

export const statsApi = createApi({
  reducerPath: "statsApi", // Unique reducerPath
  baseQuery,
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: `/stats/all`,
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
