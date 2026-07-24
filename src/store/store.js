import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slice/themeSlice";
import filterSlice from "./slice/filterSlice";
import { baseApi } from "../api/baseApi";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    filter: filterSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
