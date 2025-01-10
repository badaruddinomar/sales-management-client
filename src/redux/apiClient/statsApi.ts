import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseApi";

export const statsApi = createApi({
  reducerPath: "statsApi", // Unique reducerPath
  baseQuery,
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getStats: builder.query({
      query: ({ lastMonth }) => {
        const params = new URLSearchParams();
        if (lastMonth) params.append("lastMonth", lastMonth);
        return {
          url: `/stats/all`,
          method: "GET",
          params,
        };
      },
      providesTags: ["Stats"],
    }),
    getPieChartData: builder.query({
      query: () => {
        return {
          url: `/stats/pie`,
          method: "GET",
        };
      },
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetStatsQuery, useGetPieChartDataQuery } = statsApi;
