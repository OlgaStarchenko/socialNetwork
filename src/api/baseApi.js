import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => {},
  tagTypes: [],
});
