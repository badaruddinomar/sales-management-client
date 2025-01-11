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
          url: `/stats/pie-chart`,
          method: "GET",
        };
      },
      providesTags: ["Stats"],
    }),
    getReveneLineChartStats: builder.query({
      query: ({ range }) => {
        const params = new URLSearchParams();
        if (range) params.append("range", range);
        return {
          url: `/stats/line-chart`,
          method: "GET",
          params,
        };
      },
      providesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useGetPieChartDataQuery,
  useGetReveneLineChartStatsQuery,
} = statsApi;
